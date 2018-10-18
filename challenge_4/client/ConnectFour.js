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
  
  checkWin() {
    
  }
  
  // Don't add if first row in col is filled
  // Place at the bottom (each disc element starts at HEIGHT
  addToCol(col) {
    var currColor = this.isPlayer1 ? RED : BLACK;
      
    if (this.discs[col] >= 0) {
      //insert the disc
      var row = this.discs[col];
      this.discs[col]--;
      this.board[row][col] = currColor;
        
      this.piecesLeft--;
      this.isPlayer1 = !this.isPlayer1;
    } // else illegal move!
  }
  
  noMoreMoves() {
    return !this.piecesLeft;  
  }
  
  reset() {
    this.board = [];
    this.isPlayer1 = true;
    this.piecesLeft = WIDTH * HEIGHT;
    this.winner = NONE;
    this.discs = new Array(WIDTH).fill(HEIGHT - 1);
    
    // Create 2D array with zeros
    for (var i = 0; i < HEIGHT; i++) {
      this.board.push(new Array(WIDTH).fill(0));   
    }
  }
  
}
