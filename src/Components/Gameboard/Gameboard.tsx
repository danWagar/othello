import React from 'react';
import GamePiece from '../GamePiece/GamePiece';
import './Gameboard.css';

interface iGameboard {
  gameState: string[][];
}

const Gameboard: React.FC<iGameboard> = (props) => {
  const { gameState } = props;

  const getGameboardJSX = () => {
    return gameState.map((row, i) => {
      return (
        <ul key={i} className="Gameboard_row">
          {row.map((square, j) => (
            <li key={`${i},${j}`} id={`${i},${j}`}>
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
