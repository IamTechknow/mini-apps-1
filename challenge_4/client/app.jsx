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

var Home = (props) => (
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="p1">Player 1's name</label>
      <input type="text" className="form-control" id="p1" name="p1" onChange={props.onChange}></input>
    </div>

    <div className="form-group col-md-6">
      <label htmlFor="p2">Player 2's name</label>
      <input type="text" className="form-control" id="p2" name="p2" onChange={props.onChange}></input>
    </div>

    <button className='btn btn-primary' type="submit" onClick={props.onClick}>Start playing Connect Four!</button> 
  </div>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new ConnectFour();

    this.state = {
      start: false,
      game: this.game.board 
    };
  }

  getGameStatus() {
    if (this.game.winner) {
      return this.game.winner === RED ? `${this.state.p1} Wins!` : `${this.state.p2} Wins!`;
    }

    if (this.game.noMoreMoves()) {
      return 'Game is a tie!'   
    }

    return this.game.isPlayer1 ? `${this.state.p1}\'s Turn` : `${this.state.p2}\'s Turn`;
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

  onBtnClick(event) {
    this.setState({
      start: true
    });
  }

  // Generic form handler to save player names
  onNameChange(event) {
    let name = event.target.name;

    // Handle specific cases, otherwise just write to state
    this.setState({ [name] : event.target.value });
  }

  // Render the game board by emitting divs (Piece objects) with certain properties
  render() {
    return (
      <div className="container">
        { !this.state.start &&
          <Home onClick={this.onBtnClick.bind(this)} onChange={this.onNameChange.bind(this)} />
        }
        { this.state.start &&
          <div>
            <h1>{this.getGameStatus()}</h1>
            <p>Click on the grid to insert a disc</p>
            {
              this.state.game.map((row, idx) => (
                <BoardRow row={row} onClick={this.onClick.bind(this)} />
              ))
            }
          </div>
        }
      </div>
    );
  }
}
