 // define vars

 let ogBoard;

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
     for (i = 0; i < boxes.length; i++) {
         boxes[i].innerText = '';
         boxes[i].style.removeProperty('background-color');
         // what to do when box is clicked
         boxes[i].addEventListener('click', turnClick, false)
     }
 }

 function turnClick(box) {
     // check that the box has not already been used
     if (typeof ogBoard[box.target.id] == 'number') {
         // start players turn on click
         turn(box.target.id, hPlayer)
         // cpu player turn
         if (!checkTie()) turn(bestSpot(), cPlayer);
     }
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
     let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
     let gameWon = null;
     // check if the game is won by iterating through the winpatterns 
     // .entries returns the item and index
     for (let [index, win] of winPatterns.entries()) {
         // for every element in each win pattern, we check that there is a corresponding index 
         if (win.every(elem => plays.indexOf(elem) > -1)) {
             gameWon = {
                 index: index,
                 player: player
             };
             break;
         }
     }
     // will be null or index&player
     return gameWon;
 }

 function gameOver(gameWon) {
     // go through every  index of the winning pattern
     for (let index of winPatterns[gameWon.index]) {
         // get the element and change the background colour
         document.getElementById(index).style.backgroundColor =
             // green for human player, red for ai
             gameWon.player == hPlayer ? "green" : "red";
         // stop clickability
         for (i = 0; i < boxes.length; i++) {
             boxes[i].removeEventListener('click', turnClick, false)
         }
     }
 }

 function declareWinner(winner) {
     document.querySelector(".endgame").style.display = "block";
     document.querySelector(".endgame .text").innerText = winner;
 }

 function emptySpaces() {
     // filter board to get squares that do not have a token
     return ogBoard.filter(s => typeof s == 'number')
 }

 function bestSpot() {
     // return result of minimax 
     return minimax(ogBoard, cPlayer).index;
 }

 function checkTie() {
     if (emptySpaces().length === 0) {
         for (i = 1; i < boxes; i++) {
             cells[i].style.backgroundColor = "green";
             cells[i].removeEventListener('click', turnClick, false);
         }
         declareWinner("The game is a tie.");
         return true;
     }
     return null;
 }

 function minimax(newBoard, player) {
     //  make a list of all the empty spots
     let availSpots = emptySpaces(newBoard);

     // check for a winner and assign score to this recusion branch
     if (checkWin(newBoard, hPlayer)) {
         return {
             score: -10
         };
     } else if (checkWin(newBoard, cPlayer)) {
         return {
             score: 10
         };
     } else if (availSpots.length === 0) {
         return {
             score: 0
         }
     }

     // RECURSIVE BIT

     // data structure for all moves
     let moves = [];
     // loop through all moves n collect score+index
     for (let i = 0; i < availSpots.length; i++) {
         var move = {};
         move.index = newBoard[availSpots[i]];
         
         // put the current player in the first spot
         newBoard[availSpots[i]] = player;

         // then recall the function and wait for a value
         if (player == cPlayer) {
             var result = minimax(newBoard, hPlayer);
             move.score = result.score;
         } else {
             var result = minimax(newBoard, cPlayer);
             move.score = result.score;
         }; 

         newBoard[availSpots[i]] = move.index;

         // push all the moves to the moves array
         moves.push(move);
     }

         // get highest scoring move for ai and lowest for hu
         var bestMove;
         if (player === cPlayer) {
             var bestScore = -10000;
             for (var i = 0; i < moves.length; i++) {
                 if (moves[i].score > bestScore) {
                     bestScore = moves[i].score;
                     bestMove = i;
                 }
             }
         } else { // vice versa, needs to look for lowest score to store
             var bestScore = 10000;
             for (var i = 0; i < moves.length; i++) {
                 if (moves[i].score > bestScore) {
                     bestScore = moves[i].score;
                     bestMove = i;
                 }
             }
         }

         return moves[bestMove];
     }