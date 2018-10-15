// Game states and constants
var NO_WINNER = 0;
var PLAYER1 = 1;
var PLAYER2 = 2;
var WIN_VECTOR = 7; // Match any bit vector with all ones
var WIN_COLS = 3;
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
var checkCurrRow = function(row) {
  return currVectors[row] === WIN_VECTOR;
};

// Grab each bit vector from the array.
// If the bit mask checks out, divide by col to get 1 or 0.
var checkCurrCol = function(col) {
  var mask = 1 << col;
  var row1 = (currVectors[0] & mask) >> col;
  var row2 = (currVectors[1] & mask) >> col;
  var row3 = (currVectors[2] & mask) >> col;
  return row1 + row2 + row3 === 3;
};

// Check the matrix at (0,0), (1,1), (2,2)
var checkCurrMajorDiagonal = function() {
  var loc1 = (currVectors[0] & 1);
  var loc2 = (currVectors[1] & 2);
  var loc3 = (currVectors[2] & 4);
  return (loc1 | loc2 | loc3) === WIN_VECTOR;
};

// Check the matrix at (0,2), (1,1), (2,0)
var checkCurrMinorDiagonal = function() {
  var loc1 = (currVectors[0] & 4);
  var loc2 = (currVectors[1] & 2);
  var loc3 = (currVectors[2] & 1);
  return (loc1 | loc2 | loc3) === WIN_VECTOR;
};

var placePiece = function(row, col) {
  currVectors[row] |= 1 << col;
};

var hasCurrPlayerWon = function(row, col) {
  return checkCurrRow(row) || checkCurrCol(col)
    || checkCurrMajorDiagonal() || checkCurrMinorDiagonal();
};

var getGameText = function() {
  if (winState !== NO_WINNER) {
    return winState === PLAYER1 ? 'Player 1 wins!' : 'Player 2 wins!';
  }

  if (!piecesLeft) {
    return 'Game is a tie!';
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

  currVectors = isPlayer1 ? p1Rows : p2Rows;

  // Place X or O in view and model, based on embedded data
  var r = Number.parseInt(event.target.dataset.row);
  var c = Number.parseInt(event.target.dataset.col);
  placePiece(r, c);
  event.target.textContent = isPlayer1 ? 'X' : 'O';

  // Check game status
  if (hasCurrPlayerWon(r, c)) {
    winState = isPlayer1 ? PLAYER1 : PLAYER2;
  } else {
    isPlayer1 = !isPlayer1;
  }

  updateGameText();
};

// Initialization function, find relevant elements, attach listeners
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('resetBtn').addEventListener('click', onReset);

  for (var ele of document.getElementsByClassName('piece')) {
    ele.addEventListener('click', onGridClick);
  }

  // Reset the game, in other words don't rely on initial state when refreshing!
  onReset();
}, true);
