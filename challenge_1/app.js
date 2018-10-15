var game = new TicTacToe();

// Determine the view's text based on the current game state
var getGameText = function() {
  if (game.winState !== NO_WINNER) {
    return game.winState === PLAYER1 ? 'Player 1 wins!' : 'Player 2 wins!';
  }

  if (!game.piecesLeft) {
    return 'Game is a tie!';
  }

  return game.isPlayer1 ? 'Player 1\'s turn' : 'Player 2\'s turn';
};

var updateGameText = function () {
  document.getElementById('gameState').textContent = getGameText();
};

// Event listener functions
var onReset = function(event) {
  game.reset(); // Reset Model

  // Reset view
  for (var ele of document.getElementsByClassName('piece')) {
    ele.textContent = undefined;
  }
  updateGameText();
};

var onGridClick = function(event) {
  // Ignore grid already clicked or game is finished
  if (game.winState || event.target.textContent) {
    return;
  }

  // Place X or O in view and model, based on embedded data
  var r = Number.parseInt(event.target.dataset.row);
  var c = Number.parseInt(event.target.dataset.col);
  event.target.textContent = game.isPlayer1 ? 'X' : 'O';
  game.placePiece(r, c);

  // Game has been updated and determined winner, update view
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
