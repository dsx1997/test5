import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      
      
      <header className="App-header">
        <Game />
      </header>      
      
    </div>
  );
}

function Square(props) {

    return (
      
      <button className="square" onClick={props.funcProps1}>
        {props.valProps1}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square valProps1={this.props.valProps2[i]} funcProps1={() => this.props.funcProps2(i)}/>;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares : Array(9).fill(null),
      }],
      xIsNext : true,
      stepNumber : 0,
    };
  }

  handleClick(i) {
    console.log('handleClick : ', i);
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];    
    let squares = current.squares.slice();
    if(squares[i] || judgeWinner(squares)) {
      console.log('return case');
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        squares : squares,
      }]),
      xIsNext : !this.state.xIsNext,
      stepNumber : history.length,
    });
  }

  jumpTo(move) {
    console.log('jumpTo : ', move);
    this.setState({
      stepNumber : move,
      xIsNext : move % 2 === 0,
    })
  }

  render() {
    
    let status;
    console.log('this is render part ==================================')
    console.log('stepNumber : ', this.state.stepNumber);
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log('history'); console.log(history);
    let current = history[history.length - 1];
    console.log('current '); console.log(current);
    let squares = current.squares.slice();
    console.log('squares'); console.log(squares);

    let winner = judgeWinner(squares);
    if(winner) {
      status = 'Winner is : ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step1, move1) => {
      console.log('step'); console.log(step1);
      console.log('moves', move1);
      let desc = move1 ? 'Go to step #' : 'Go to first game';
      return (
        <li key={move1}>
          <button onClick={() => this.jumpTo(move1)}>{desc}</button>
        </li>
      );
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board valProps2={squares} funcProps2={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function judgeWinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================


export default App;
