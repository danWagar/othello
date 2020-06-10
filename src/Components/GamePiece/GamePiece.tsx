import React from 'react';
import { Properties } from 'csstype';

interface iGamePiece {
  type: string;
}

const GamePiece: React.FC<iGamePiece> = (props) => {
  const { type } = props;

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

  const getStyle = () => {
    if (type === 'w') return whitePiece;
    else if (type === 'b') return blackPiece;
    else if (type === 'p') return possibleMove;
    return {};
  };

  return <div style={getStyle()}></div>;
};

export default GamePiece;
