import React, { useState, useEffect } from 'react';
import GamePiece from '../GamePiece/GamePiece';
import { searchForMoves, updateBoard } from '../../gameAlgorithms';
import initialGameboard from '../../initialGameboard';
import './Gameboard.css';

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)

interface iGameboard {
  gameState: string[][];
}

const Gameboard: React.FC<iGameboard> = (props) => {
  //let gameBoard = gameState.map((row) => row.map((square) => square));
  //valid options for playerTurn are 'w' and 'b';
  const [playerTurn, setPlayerTurn] = useState<string>('b');

  const [gameBoard, setGameBoard] = useState<string[][]>(initialGameboard);

  useEffect(() => {
    let boardCopy = gameBoard.map((row) => row.map((square) => square));
    setGameBoard(searchForMoves(boardCopy, playerTurn));
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
