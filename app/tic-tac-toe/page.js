"use client";

import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  //calculate tictactoe winner
  const calculateWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = () => {
    return board.every((square) => square != null);
  };

  const winner = calculateWinner(board);

  const handleSquareClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <button
        key={index}
        onClick={() => handleSquareClick(index)}
        className="w-24 h-24 m-1 bg-gray-200 hover:bg-gray-300 focus:outline-none flex justify-center items-center"
      >
        {board[index] && (
          <div
            className={`flex justify-center items-center w-full h-full ${
              board[index] === "X" ? "x" : "o"
            }`}
          >
            {board[index] === "X" ? (
              <svg width="40" height="40" viewBox="0 0 40 40">
                <line
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  stroke="black"
                  strokeWidth="5"
                  strokeDasharray="80"
                />
                <line
                  x1="40"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="black"
                  strokeWidth="5"
                  strokeDasharray="80"
                />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="15"
                  stroke="black"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="100"
                />
              </svg>
            )}
          </div>
        )}
      </button>
    );
  };

  const isDraw = isBoardFull() && !winner;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-semibold mb-4">Tic Tac Toe</h1>
      <h2 className="text-xl mb-4">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
      <div className="grid grid-cols-3  gap-2 justify-center mb-4 ">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <button
        className="mt-4 p-2 text-lg font-semibold bg-blue-500, text-black rounded bg-blue-300 focus:outline-none"
        onClick={() => handleReset()}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
