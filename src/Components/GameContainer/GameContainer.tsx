import React, { useState, useEffect } from 'react';
import GameBoard from '../Gameboard/Gameboard';
import Score from '../Score/Score';
import initialGameboard from '../../initialGameboard';
import './GameContainer.css';

interface iScore {
  b: number;
  w: number;
  current: string;
}

const GameContainer: React.FC = () => {
  const [score, setScore] = useState<iScore>({ b: 2, w: 2, current: 'b' });
  const [color, setColor] = useState<string>('');
  const [start, setStart] = useState<boolean>(true);

  const handleScoreChange = (score: iScore) => {
    setScore(score);
  };

  const updatePlayerColorChoice = (color: string) => {
    setColor(color);
  };

  const newGame = () => {
    setStart(true);
  };

  console.log('GameContainer start is ', start);
  return (
    <div className="GameContainer">
      <span className="GameContainer_watermark">Othello</span>
      <Score score={score} updateColor={updatePlayerColorChoice} start={start} />
      {color && (
        <GameBoard
          gameState={initialGameboard}
          updateScore={handleScoreChange}
          playerColor={color}
          newGame={newGame}
        />
      )}
    </div>
  );
};

export default GameContainer;
