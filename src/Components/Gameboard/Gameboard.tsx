import React, { useState, useEffect } from 'react';
import GamePiece from '../GamePiece/GamePiece';
import searchForMoves from '../../gameAlgorithms';
import './Gameboard.css';

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)

interface iGameboard {
  gameState: string[][];
}

const Gameboard: React.FC<iGameboard> = (props) => {
  let { gameState } = props;
  let gameBoard = gameState.map((row) => row.map((square) => square));
  const [playerTurn, setPlayerTurn] = useState<string>('b');
  gameBoard = searchForMoves(gameBoard, playerTurn);
  //valid options for playerTurn are 'w' and 'b';

  useEffect(() => {
    gameBoard = searchForMoves(gameBoard, playerTurn);
  }, [playerTurn]);

  console.log(gameBoard);

  const getGameboardJSX = () => {
    return gameBoard.map((row, i) => {
      return (
        <ul key={i} className="Gameboard_row">
          {row.map((square, j) => (
            <li key={j} id={`${i},${j}`}>
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
