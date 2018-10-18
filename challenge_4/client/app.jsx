import React from 'react';
import ConnectFour from './ConnectFour.js';

// Game constants
const NONE = 0, RED = 1, BLACK = 2;

// Board row component
var BoardRow = (props) => (
  <div className='row'>
    { 
      props.row.map((disc, idx) => (
        <div className={disc === 0 ? 'disc' : (disc === RED ? 'disc red' : 'disc black')} onClick={props.onClick.bind(this, idx)} />
      ))
    }
  </div>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new ConnectFour();

    this.state = {
      game: this.game.board 
    };
  }

  getGameStatus() {
    if (this.game.winner) {
      return this.game.winner === RED ? 'Player 1 Wins!' : 'Player 2 Wins!';
    }

    if (this.game.noMoreMoves()) {
      return 'Game is a tie!'   
    }

    return this.game.isPlayer1 ? 'Player 1\'s Turn' : 'Player 2\'s Turn';
  }

  // Upon click, attempt to add a disc to the column and update the React state
  onClick(col) {
    if (!this.game.winner) {
      this.game.addToCol(col);
    
      this.setState({
        game: this.game.board
      });
    }
  }

  // Render the game board by emitting divs (Piece objects) with certain properties
  render() {
    return (
      <div>
        <h1>{this.getGameStatus()}</h1>
        { 
          this.state.game.map((row, idx) => (
            <BoardRow row={row} onClick={this.onClick.bind(this)} />
          ))
        }
      </div>
    );
  }
}
