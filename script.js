const game = (() => {
  //caching elements
  const board = document.querySelector('.board')
  const cells = board.querySelectorAll('div')
  const pvpBtn = document.querySelector('#pvpButton')
  const pvaiBtn = document.querySelector('#pvaiButton')
  const restartBtn = document.querySelector('#restartGame')
  const continueBtn = document.querySelector('#continueBtn')
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
  let turn = ''
  let totalTurns = 0
  let player1 = ''
  let player2 = ''
  let players = []
  const winProbs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  //listeners for pvp pvai buttons, this aproach will encapsulate all the logic
  //listen pvp and pvai buttons
  listen()

  //TODO. AI
  function start() {
    console.log('Starting game')
    //random to decide who goes first
    players.push(player1)
    players.push(player2)
    turn = Math.floor(Math.random() * 2)
    console.log(turn)
    console.log(players)

    //set first turn
    board.classList.add(players[turn].getMark())

    //board listener
    cells.forEach(cell => {
      cell.addEventListener('click', checkBoard, { once: true })
    })
  }
  function checkBoard(e) {
    if (!e.target.classList.contains('x') && !e.target.classList.contains('o')) {
      e.target.classList.add(players[turn].getMark())
      checkWin()

      swapTurn()
    }
    console.log(e.target)

  }
  function makeMove(player) {
    //set board class x or o
    console.log(player.getName())
    board.classList.add(player.getMark())
  }
  function checkWin(e) {
    let currentMoves = []
    //totalTurns 
    totalTurns += 1
    console.log('totalTurn: ' + totalTurns)
    // get all indexes from current player moves
    document.querySelectorAll(`.cell.${players[turn].getMark()}`).forEach(c => {
      currentMoves.push(Number(c.getAttribute('cell-index')))
    })
    let hasWin = false
    //check if some winner array is included in currentMoves,
    hasWin = winProbs.some(arr => arr.every(prob => currentMoves.includes(prob)))
    if (hasWin) {
      resultMessage(true)
      console.log(`${players[turn].getName()} has win`)
      //add victory
      players[turn].win()
      //update player stat
      let victorySpn = turn === 1 ? 'p2' : 'p1'
      document.querySelector(`#${victorySpn}-victories`).textContent = players[turn].getVictories()
      //winner popUp
      newRound()
    }
    if (totalTurns > 8) {
      console.log('Match Tie')
      resultMessage(false)
      newRound()
    }
  }
  function resultMessage(win) {
    const resultMsgContainer = document.querySelector('.resultMessage')
    const message = resultMsgContainer.querySelector('h2')
    if (win) {
      message.textContent = `${players[turn].getName()} WON`
    } else {
      message.textContent = 'Match Tied'
    }
    popUpOverlay.style.display = 'block'
    resultMsgContainer.style.display = 'flex'
    continueBtn.addEventListener('click', () => {
      popUpOverlay.style.display = 'none'
      resultMsgContainer.style.display = 'none'
    })

  }
  function newRound() {
    board.querySelectorAll('div').forEach(cell => {
      cell.classList.remove('x')
      cell.classList.remove('o')
    })
    board.classList.remove('x')
    board.classList.remove('o')
    //remove board listeners
    cells.forEach(cell => {
      cell.removeEventListener('click', checkBoard, { once: true })
    })
    //set first turn
    board.classList.add(players[turn].getMark())

    //board listener
    cells.forEach(cell => {
      cell.addEventListener('click', checkBoard, { once: true })
    })
    totalTurns = 0
  }
  function swapTurn() {
    turn = turn === 1 ? 0 : 1
    board.classList.remove('x')
    board.classList.remove('o')
    board.classList.add(players[turn].getMark())
  }

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
    board.classList.remove('x')
    board.classList.remove('o')
    //remove board listeners
    cells.forEach(cell => {
      cell.removeEventListener('click', checkBoard, { once: true })
    })
    player1 = ''
    player2 = ''
    players = []
    //show pvp pvai buttons
    pvpBtn.style.display = 'inline'
    pvaiBtn.style.display = 'inline'
    //hide stats
    statsCon.style.display = 'none'
    totalTurns = 0

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

    player1 = player(player1Name, 'x')
    player2 = player(player2Name, 'o')

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
    document.querySelector('#p1-victories').textContent = player1.getVictories()
    document.querySelector('#p2-victories').textContent = player2.getVictories()

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