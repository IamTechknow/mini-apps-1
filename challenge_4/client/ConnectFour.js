// Game constants
const NONE = 0, RED = 1, BLACK = 2, WIDTH = 8, HEIGHT = 7;

export default class ConnectFour {
  constructor() {
    this.gameBoard = undefined;
    this.isPlayer1 = undefined;
    this.piecesLeft = undefined;
    this.winner = undefined;
    
    this.reset();
  }
  
  checkWin() {
    
  }
  
  addToCol(col) {
    // Don't add if first row in col is filled
    if (!this.gameBoard[0][col]) {
    
       this.piecesLeft--;
    }
  }
  
  noMoreMoves() {
    return !this.piecesLeft;  
  }
  
  reset() {
    this.gameBoard = [];
    this.isPlayer1 = true;
    this.piecesLeft = WIDTH * HEIGHT;
    this.winner = NONE;
    
    // Create 2D array with zeros
    for (var i = 0; i < HEIGHT; i++) {
      this.gameBoard.push(new Array(WIDTH).fill(0));   
    }
  }
  
}
