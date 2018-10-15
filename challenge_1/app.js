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

// Used to set p1Rows or p2Rows once per turn and prevent duplicated code
var currVectors;

// Helper functions for controlling the game model
var checkCurrRow = function(isPlayer1, row) {
  return currVectors[row] === WIN_VECTOR;
};

// Grab each bit vector from the array, use bitwise AND and OR to form the correct bit vector.
var checkCurrCol = function(isPlayer1, col) {
  var row1 = (currVectors[0] & 1 << col) | (1 << 0);
  var row2 = (currVectors[1] & 1 << col) | (1 << 1);
  var row3 = (currVectors[1] & 1 << col) | (1 << 2);
  return row1 | row2 | row3 === WIN_VECTOR;
};

var checkCurrMajorDiagonal = function(isPlayer1) {
  return false;
};

var checkCurrMinorDiagonal = function(isPlayer1) {
  return false;
};

var placePiece = function(isPlayer1, row, col) {
  
};

var hasPlayerWon = function(isPlayer1, row, col) {
  currVectors = isPlayer1 ? p1Rows : p2Rows;
  return checkCurrRow(isPlayer1, row) || checkCurrCol(isPlayer1, col) 
    || checkCurrMajorDiagonal(isPlayer1) || checkCurrMinorDiagonal(isPlayer1);
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
  currVectors = undefined;

  // Reset view
  for (var ele of document.getElementsByClassName('piece')) {
    ele.textContent = undefined;
  }
  updateGameText();
};

var onGridClick = function(event) {
  // Ignore grid already clicked or game is finished
  if (winState || event.target.textContent) {
    return;
  }

  piecesLeft--;

  // Place X or O in view and model, based on embedded data
  var r = event.target.dataset.row;
  var c = event.target.dataset.col;
  event.target.textContent = isPlayer1 ? 'X' : 'O';
  placePiece(isPlayer1, r, c);

  // Check game status
  if (hasPlayerWon(isPlayer1, r, c)) {
    winState = isPlayer1 === ? PLAYER1 : PLAYER2 ;
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

  // Reset the game, in other words don't rely on initial state when refreshing!
  onReset();
}, true);
