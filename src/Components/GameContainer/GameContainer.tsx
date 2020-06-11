import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import GameBoard from '../Gameboard/Gameboard';
import Score from '../Score/Score';
import './GameContainer.css';

interface iScore {
  b: number;
  w: number;
  current: string;
}

const GameContainer: React.FC = () => {
  const { game, setGame } = useContext(GameContext);

  const handleHideMovesSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    setGame({ ...game, displayMoves: !value });
  };

  return (
    <div className="GameContainer">
      <span className="GameContainer_watermark">Othello</span>
      <Score />
      <label style={{ display: game.start ? 'inline-block' : 'none' }}>
        <input type="checkbox" onClick={handleHideMovesSelect} />
        Hide Moves
      </label>
      {game.playerColor && <GameBoard />}
    </div>
  );
};

export default GameContainer;
