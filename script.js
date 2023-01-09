
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


  //private variables

  //listenners for pvp pvai buttons, this aproach will encapsulate all the logic

  const start = () => {
    //listen pvp and pvai buttons
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
