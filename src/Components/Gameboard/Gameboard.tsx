import React, { useState, useEffect } from 'react';
import GamePiece from '../GamePiece/GamePiece';
import { searchForMoves, updateBoard, getScore } from '../../gameAlgorithms';
import './Gameboard.css';

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)
interface iScore {
  b: number;
  w: number;
}

interface iGameboard {
  gameState: string[][];
  updateScore: (score: iScore) => void;
}

const Gameboard: React.FC<iGameboard> = (props) => {
  const { gameState, updateScore } = props;
  //valid options for playerTurn are 'w' and 'b';
  const [playerTurn, setPlayerTurn] = useState<string>('b');
  const [gameBoard, setGameBoard] = useState<string[][]>(gameState);
  //const [score, setScore] = useState<iScore>(getScore(gameBoard));

  useEffect(() => {
    let boardCopy = gameBoard.map((row) => row.map((square) => square));
    setGameBoard(searchForMoves(boardCopy, playerTurn));
    const score = getScore(gameBoard);
    updateScore(score);
  }, [playerTurn]);

  const handleSquareClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const row = parseInt(e.currentTarget.getAttribute('data-row')!);
    const column = parseInt(e.currentTarget.getAttribute('data-column')!);

    if (gameBoard[row][column] !== 'p') return;

    const changedBoard = updateBoard(gameBoard, row, column, playerTurn);

    setGameBoard(changedBoard);
    setPlayerTurn(playerTurn === 'w' ? 'b' : 'w');
  };

  const getGameboardJSX = () => {
    return gameBoard.map((row, i) => {
      return (
        <ul key={i} className="Gameboard_row">
          {row.map((square, j) => (
            <li key={j} data-row={i} data-column={j} onClick={handleSquareClick}>
              <GamePiece type={square} />
            </li>
          ))}
        </ul>
      );
    });
  };

  return <div className="Gameboard">{getGameboardJSX()}</div>;
};

export default Gameboard;
