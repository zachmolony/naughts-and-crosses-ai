// define vars

var ogBoard;

// player peices
const hPlayer = "0";
const cPlayer = "X";
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const boxes = document.querySelectorAll('.box')

startGame();

function startGame() {
    // hiding the endgame message at start of game
    document.querySelector('.endgame').style.display = "none";
    // init array 0-9
    ogBoard = Array.from(Array(9).keys());
    // empty boxes
    for (i=0; i<boxes.length; i++) {
        boxes[i].innerText = '';
        boxes[i].style.removeProperty('background-color');
        // what to do when box is clicked
        boxes[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(box) {
    // start players turn on click
    turn(box.target.id, hPlayer)
}

function turn(boxId, player) {
    // change board value
    ogBoard[boxId] = player;
    // update the display
    document.getElementById(boxId).innerText = player;
    // check if player has just won 
    let gameWon = checkWin(ogBoard, player);
    // call the game over function if the game has been won [if null then no]
    if (gameWon) gameOver(gameWon)
}

// passing through board rather than ref of og var for minimax
function checkWin(board, player) {
    // find all the boxes that player has taken
    let plays = board.reduce((a, e, i) => (e === player)) ? a.concat(i) : a, []);
    let gameWon = null;
    // check if the game is won by iterating through the winpatterns 
    // .entries returns the item and index
    for (let [index, win] of winPatterns.entries()) {
        // for every element in each win pattern, we check that there is a corresponding index 
        if (win.every(elem => plays.indexOf(elem > -1)) {
            gameWon = {index: index, player: player};
            break;
            })
    }
    // will be null or index&player
    return gameWon;
}
}