import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import GameBoard from '../Gameboard/Gameboard';
import GameOptions from '../GameOptions/GameOptions';
import Score from '../Score/Score';
import './GameContainer.css';

interface iScore {
  b: number;
  w: number;
  current: string;
}

const GameContainer: React.FC = () => {
  const { game } = useContext(GameContext);

  const { start } = game;

  return (
    <div className="GameContainer">
      <span className="GameContainer_watermark">Othello</span>
      <Score />
      <GameOptions />
      {start && <GameBoard />}
    </div>
  );
};

export default GameContainer;
