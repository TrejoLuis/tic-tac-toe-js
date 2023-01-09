
// setting cells values example
// const board = document.querySelector('.board')
// const cells = board.querySelectorAll('div')

// cells.forEach(c => c.addEventListener('click', (e) => {
//   console.log(e.target)
//   console.log(e.target.classList.contains('o'))
//   if (!e.target.classList.contains('x') && !e.target.classList.contains('o')) {
//     if (board.classList.contains('o')) {
//       e.target.classList.add('o')
//     } else if (board.classList.contains('x')) {
//       e.target.classList.add('x')
//     }
//   }
// }))

const game = (() => {
  //caching elements
  const board = document.querySelector('.board')
  const pvpBtn = document.querySelector('#pvpButton')
  const pvaiBtn = document.querySelector('#pvaiButton')
  const restartBtn = document.querySelector('#restartGame')
  const playersForm = document.querySelector('#players-form')
  const p2Input = document.querySelector('.p2-input')
  const aiInput = document.querySelector('.ai-input')
  const p1Name = document.querySelector('#p1-name')
  const p2Name = document.querySelector('#p2-name')
  const aiDif = document.querySelector('#aiDif')
  const statsCon = document.querySelector('.stats-container')
  const popUpOverlay = document.querySelector('.popUp-overlay')
  const popUpClose = document.querySelector('.popUp-close')

  //private variables
  let mode = ''
  let player1 = ''
  let player2 = ''

  //listenners for pvp pvai buttons, this aproach will encapsulate all the logic
  //listen pvp and pvai buttons
  listen()

  function start() {
    console.log('AAA')
    //mode pvp pvai, pop up the form and blacken the background, after hide pvp pvai buttons, and show players stats-container
    //  pvp, a form to let the players write their names, always player 1 will have X as marker
    //  pvai, same form above, just hidding player 2 fields
    //create players or player
    //random to decide who goes first
    //loop until someone wins or there are no more turns
    //  player move *if pvai check to run the ai* *based on its marker, set the board with that class*
    //  check the board for winner *an array with the posibilities, and combination of each, compare with the cells* - or by creating a method on players to check each move it makes and comparing with the array* *if there's a winner or the game is tied, show end pop up
    //  swap turn *swap board class*

  }
  //mode
  //player move
  //swap turn
  //check win
  //restart - clear completely the game, hidding stats-container and showing pvp pvai buttons, 
  //

  function popUpHandler(e) {
    console.log(e)
    //If pvp
    if (e.target.id === 'pvpButton') {
      popUpOverlay.style.display = 'block'
      playersForm.style.display = 'flex'
      mode = 'pvp'
      //show p2-input
      p2Input.style.display = 'block'
      //Handle submit
    }
    //If pvAi
    else if (e.target.id === 'pvaiButton') {
      popUpOverlay.style.display = 'block'
      playersForm.style.display = 'flex'
      mode = 'pvai'
      //show ai-input
      aiInput.style.display = 'block'
      //Handle submit
    }
    //If close popUp
    else if (e.target.className === 'popUp-close' || (e.type === 'submit' && e.target.className === 'popUp')) {
      popUpOverlay.style.display = 'none'
      playersForm.style.display = 'none'
      p2Input.style.display = 'none'
      aiInput.style.display = 'none'
      statsCon.style.display = 'none'
    }
    /// pvai settings form

  }

  function listen() {
    pvpBtn.addEventListener('click', popUpHandler)
    pvaiBtn.addEventListener('click', popUpHandler)
    popUpClose.addEventListener('click', popUpHandler)
    playersForm.addEventListener('submit', createPlayers)
    restartBtn.addEventListener('click', clearGame)
  }

  function clearGame() {
    //reset cells class
    board.querySelectorAll('div').forEach(cell => {
      cell.classList.remove('x')
      cell.classList.remove('o')
    })
    player1 = ''
    player2 = ''
    //show pvp pvai buttons
    pvpBtn.style.display = 'inline'
    pvaiBtn.style.display = 'inline'
    //hide stats
    statsCon.style.display = 'none'

  }

  function createPlayers(e) {
    e.preventDefault()

    let player1Name = p1Name.value !== '' ? p1Name.value : 'Player1'
    let player2Name = ''
    if (mode === 'pvp') {
      player2Name = p2Name.value !== '' ? p2Name.value : 'Player2'
    } else {
      player2Name = `Computer ${aiDif.options[aiDif.selectedIndex].textContent}`
    }

    player1 = player(player1Name, 'X')
    player2 = player(player2Name, 'O')

    console.log(player1.getName() + ' ' + player2.getName())
    //close popUp
    popUpHandler(e)
    playersForm.reset()
    //show stats and reset button
    statsCon.style.display = 'block'
    //hide pvp pvai buttons
    pvpBtn.style.display = 'none'
    pvaiBtn.style.display = 'none'
    //setting stats-container
    document.querySelector('.p1-mark').textContent = player1.getMark()
    document.querySelector('.p2-mark').textContent = player2.getMark()
    document.querySelector('#p1stat-name').textContent = player1.getName()
    document.querySelector('#p2stat-name').textContent = player2.getName()



    start()
  }

})()

const player = (name, mark) => {
  let victories = 0

  const getMark = () => mark
  const getName = () => name
  const getVictories = () => victories
  const win = () => ++victories

  return {
    getMark,
    getName,
    getVictories,
    win
  }
}

//START
const luis = player('Luis', 'x')
const dio = player('Dio', 'o')
