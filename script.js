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
]

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
    document.getElementById(boxId).innerText = player
}