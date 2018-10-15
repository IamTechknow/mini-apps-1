// Model implementation of the Tic-Tac-Toe game.

// Game constants
const NO_WINNER = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;
const WIN_VECTOR = 7; // Match any bit vector with all ones
const WIN_COLS = 3;
const PIECES_START = 9;

class TicTacToe {
  constructor() {
    this.winState = undefined;
    this.isPlayer1 = undefined;
    this.piecesLeft = undefined;

    // Bit vectors for each player
    this.p1Rows = undefined;
    this.p2Rows = undefined;

    // Used to set p1Rows or p2Rows once per turn and prevent duplicated code
    this.currVectors = undefined;
  }
  
  checkCurrRow(row) {
    return this.currVectors[row] === WIN_VECTOR;
  };

  // Grab each bit vector from the array.
  // If the bit mask checks out, divide by col to get 1 or 0.
  checkCurrCol(col) {
    var mask = 1 << col;
    var row1 = (this.currVectors[0] & mask) >> col;
    var row2 = (this.currVectors[1] & mask) >> col;
    var row3 = (this.currVectors[2] & mask) >> col;
    return row1 + row2 + row3 === 3;
  };

  // Check the matrix at (0,0), (1,1), (2,2)
  checkCurrMajorDiagonal() {
    var loc1 = (this.currVectors[0] & 1);
    var loc2 = (this.currVectors[1] & 2);
    var loc3 = (this.currVectors[2] & 4);
    return (loc1 | loc2 | loc3) === WIN_VECTOR;
  };

  // Check the matrix at (0,2), (1,1), (2,0)
  checkCurrMinorDiagonal() {
    var loc1 = (this.currVectors[0] & 4);
    var loc2 = (this.currVectors[1] & 2);
    var loc3 = (this.currVectors[2] & 1);
    return (loc1 | loc2 | loc3) === WIN_VECTOR;
  };

  // Main API functions
  placePiece(row, col) {
    this.piecesLeft--;
    this.currVectors = this.isPlayer1 ? this.p1Rows : this.p2Rows;
    
    this.currVectors[row] |= 1 << col;
    
    // Check game status
    if (game.hasCurrPlayerWon(row, col)) {
      this.winState = this.isPlayer1 ? PLAYER1 : PLAYER2;
    } else {
      this.isPlayer1 = !this.isPlayer1;
    }
  };

  hasCurrPlayerWon(row, col) {
    return this.checkCurrRow(row) || this.checkCurrCol(col)
      || this.checkCurrMajorDiagonal() || this.checkCurrMinorDiagonal();
  };
  
  reset() {
    this.winState = NO_WINNER;
    this.isPlayer1 = true;
    this.piecesLeft = PIECES_START;

    this.p1Rows = [0, 0, 0];
    this.p2Rows = [0, 0, 0];
    this.currVectors = undefined;   
  }
}
