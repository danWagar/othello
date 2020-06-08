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
  };

  const whitePiece: Properties = {
    ...pieceStyle,
    backgroundColor: 'white',
    borderRadius: '50%',
  };

  const blackPiece: Properties = {
    ...pieceStyle,
    backgroundColor: 'black',
    borderRadius: '50%',
  };

  const getStyle = () => {
    if (type === 'w') return whitePiece;
    else if (type === 'b') return blackPiece;
    return {};
  };

  return <div style={getStyle()}></div>;
};

export default GamePiece;
