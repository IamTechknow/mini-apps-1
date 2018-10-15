// Game states and constants
var NO_WINNER = 0;
var PLAYER1 = 1;
var PLAYER2 = 2;
var WIN_VECTOR = 7; // Match any bit vector with all ones
var PIECES_START = 9;

var winState;
var isPlayer1;
var piecesLeft;

// Bit vectors for each player
var p1Rows;
var p2Rows;

// Helper functions for controlling the game model
var checkRow = function(isPlayer1, row) {
  
};

var checkCol = function(isPlayer1, col) {
  
};

var checkMajorDiagonal = function(isPlayer1) {
  
};

var checkMinorDiagonal = function(isPlayer1) {
  
};

var placePiece = function(isPlayer1, row, col) {
  
};

var hasPlayerWon = function(isPlayer1, row, col) {
  return false;
};

var getGameText = function() {
  if (!piecesLeft) {
    return 'Game is a tie!';
  }

  if (winState !== NO_WINNER) {
    return winState === PLAYER1 ? 'Player 1 wins!' : 'Player 2 wins!';
  }
  return isPlayer1 ? 'Player 1\'s turn' : 'Player 2\'s turn';
};

var updateGameText = function () {
  document.getElementById('gameState').textContent = getGameText();
};

// Event listener functions
var onReset = function(event) {
  // Reset model
  winState = NO_WINNER;
  isPlayer1 = true;
  piecesLeft = PIECES_START;

  p1Rows = [0, 0, 0];
  p2Rows = [0, 0, 0];

  // Reset view
  updateGameText();
};

var onGridClick = function(event) {
  // Ignore grid already clicked on
  if (event.target.textContent) {
    return;
  }

  piecesLeft--;

  // Place X or O in view and model
  var r = event.target.dataset.row;
  var c = event.target.dataset.col;
  event.target.textContent = isPlayer1 ? 'X' : 'O';
  placePiece(isPlayer1, r, c);

  // Check game status
  if (hasPlayerWon(isPlayer1, r, c)) {
    
  } else {
    isPlayer1 = !isPlayer1;
  }
  
  updateGameText();
};

// Initialization function, attach listeners
window.addEventListener('DOMContentLoaded', function() {
  // Find relevant DOM elements, set listeners
  document.getElementById('resetBtn').addEventListener('click', onReset);

  for (var ele of document.getElementsByClassName('piece')) {
    ele.addEventListener('click', onGridClick);
  }

  // Reset the game
  onReset();
}, true);

