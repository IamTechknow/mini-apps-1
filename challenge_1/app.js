// Game states and constants
var NO_WINNER = 0;
var PLAYER1 = 1;
var PLAYER2 = 2;
var WIN_VECTOR = 7; // Match any bit vector with all ones

var winState;
var turnState;

// Bit vectors for each player
var p1Rows;
var p2Rows;

// Helper functions for controlling the game model
var checkRow = function(player, row) {
  
};

var checkCol = function(player, col) {
  
};

var checkMajorDiagonal = function(player) {
  
};

var checkMinorDiagonal = function(player) {
  
};

var getGameText = function() {
  if (winState !== NO_WINNER) {
    return winState === PLAYER1 ? 'Player 1 wins!' : 'Player 2 wins!';
  }
  return turnState === PLAYER1 ? 'Player 1\'s turn' : 'Player 2\'s turn';
};

// Event listener functions
var onReset = function(event) {
  // Reset model
  winState = NO_WINNER;
  turnState = PLAYER1;

  p1Rows = [0, 0, 0];
  p2Rows = [0, 0, 0];

  // Reset view
  document.getElementById('gameState').textContent = getGameText();
};

var onGridClick = function(event) {
  
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

