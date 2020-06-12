import React, { useContext } from 'react';
import { Properties } from 'csstype';
import { GameContext } from '../../Context/GameContext';

interface iGamePiece {
  type: string;
  wasLastMove: boolean;
}

const GamePiece: React.FC<iGamePiece> = (props) => {
  const { type, wasLastMove } = props;

  const { game } = useContext(GameContext);

  const { displayMoves } = game;

  //ultimately no real reason these styles need to be inline
  const pieceStyle: Properties = {
    height: '85%',
    width: '85%',
    borderRadius: '50%',
  };

  const whitePiece: Properties = {
    ...pieceStyle,
    backgroundColor: 'white',
    border: '1px solid #313131',
    boxShadow: '0px -5px 25px rgba(0, 0, 0, 0.9) inset',
  };

  const blackPiece: Properties = {
    ...pieceStyle,
    backgroundColor: 'rgb(100, 100, 100)',
    boxShadow: '0px -5px 25px 5px rgb(0, 0, 0) inset',
  };

  const possibleMove: Properties = {
    ...pieceStyle,
    cursor: 'pointer',
    border: '3px solid rgba(235, 60, 60, .6)',
  };

  const lastMoveStyle: Properties = {
    border: '2px solid #3730ff',
  };

  const getStyle = () => {
    let style: Properties = {};
    if (type === 'w') style = whitePiece;
    else if (type === 'b') style = blackPiece;
    else if (type === 'p' && displayMoves) style = possibleMove;

    if (wasLastMove) style = { ...style, ...lastMoveStyle };

    return style;
  };

  return <div style={getStyle()}></div>;
};

export default GamePiece;
