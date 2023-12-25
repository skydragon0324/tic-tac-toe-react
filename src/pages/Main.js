import React, {useState} from "react";

import Board from "../component/Board";


const Main = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const handlePaly = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0) {
      description = `Go to Move # ${move}`;
    } else description = 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="flex flex-between">
      <div>
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePaly} />
      </div>
      <div className="info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Main;