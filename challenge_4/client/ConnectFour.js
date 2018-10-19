// Game constants
const NONE = 0, RED = 1, BLACK = 2, WIDTH = 8, HEIGHT = 7;

export default class ConnectFour {
  constructor() {
    this.board = undefined;
    this.isPlayer1 = undefined;
    this.piecesLeft = undefined;
    this.winner = undefined;
    this.discs = undefined; // keep track of top disc position

    this.reset();
  }

  // Iterate through the given column and get a running total of consecutive colored discs
  checkColAt(row, playerColor) {
    var count = 0;
    var c = 0; 
    var curr_color;

    for (; c < WIDTH; c++) {
      curr_color = this.board[row][c];
      count = curr_color == playerColor ? count + 1 : 0;

      if (count === 4) {
        return true;
      }
    }

    return false;
  }
  
  // Iterate through the given row and get a running total of consecutive colored discs
  checkRowAt(col, playerColor) {
    var count = 0;
    var r = 0; 
    var curr_color;

    for (count = 0; r < HEIGHT; r++) {
      curr_color = this.board[r][col];
      count = curr_color == playerColor ? count + 1 : 0;

      if (count === 4) {
        return true;
      }
    }

    return false;
  }
  
  // Go to the start of the diagonal, then proceed down and right to count discs
  checkMajorDiagonalAt(row, col, playerColor) {
    var count = 0;
    var r = row;
    var c = col;
    var curr_color;

    while (r > 0 && c > 0) {
      r--;
      c--;
    }

    for (; c < WIDTH && r < HEIGHT; c++) {
      curr_color = this.board[r][c];
      count = curr_color == playerColor ? count + 1 : 0;

      if (count === 4) {
        return true;
      }
      r++; // update the two indices
    }

    return false;
  }

  // Go to the start of the diagonal, then proceed down and left to count discs
  checkMinorDiagonalAt(row, col, playerColor) {
    var count = 0;
    var r = row;
    var c = col;
    var curr_color;

    while (r > 0 && c < WIDTH) {
      r--;
      c++;
    }

    for (; c >= 0 && r < HEIGHT; c--) {
      curr_color = this.board[r][c];
      count = curr_color == playerColor ? count + 1 : 0;

      if (count === 4) {
        return true;
      }
      r++; // update the two indices
    }

    return false;
  }

  checkWin(row, col) {
    var playerColor = this.board[row][col];
    return this.checkRowAt(col, playerColor) || this.checkColAt(row, playerColor) ||
      this.checkMajorDiagonalAt(row, col, playerColor) || this.checkMinorDiagonalAt(row, col, playerColor);
  }
  
  // Don't add if first row in col is filled
  // Place at the bottom (each disc element starts at HEIGHT - 1)
  addToCol(col) {
    var currColor = this.isPlayer1 ? RED : BLACK;

    if (this.discs[col] >= 0) {
      //insert the disc
      var row = this.discs[col];
      this.discs[col]--;
      this.board[row][col] = currColor;

      this.piecesLeft--;
      this.isPlayer1 = !this.isPlayer1;

      if(this.checkWin(row, col)) {
        this.winner = currColor;
      }
    } // else illegal move!
  }

  noMoreMoves() {
    return !this.piecesLeft;
  }

  reset() {
    this.board = [];
    this.isPlayer1 = this.winner !== BLACK;
    this.piecesLeft = WIDTH * HEIGHT;
    this.winner = NONE;
    this.discs = new Array(WIDTH).fill(HEIGHT - 1);

    // Create 2D array with zeros
    for (var i = 0; i < HEIGHT; i++) {
      this.board.push(new Array(WIDTH).fill(0));   
    }
  }

}
