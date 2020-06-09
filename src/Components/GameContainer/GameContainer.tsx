import React, { useState } from 'react';
import GameBoard from '../Gameboard/Gameboard';
import Score from '../Score/Score';
import initialGameboard from '../../initialGameboard';
import './GameContainer.css';

interface iScore {
  b: number;
  w: number;
}

const GameContainer: React.FC = () => {
  const [score, setScore] = useState<iScore>({ b: 2, w: 2 });

  const handleScoreChange = (score: iScore) => {
    setScore(score);
  };

  return (
    <div className="GameContainer">
      <Score score={score} />
      <GameBoard gameState={initialGameboard} updateScore={handleScoreChange} />
    </div>
  );
};

export default GameContainer;
