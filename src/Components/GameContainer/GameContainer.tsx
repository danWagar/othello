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

  const handleDifficultySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as 'easy' | 'normal';
    setGame({ ...game, difficulty: value });
  };

  const labelStyle = { display: game.start ? 'inline-block' : 'none' };

  return (
    <div className="GameContainer">
      <span className="GameContainer_watermark">Othello</span>
      <Score />
      <div className="GameContainer_options">
        <label style={labelStyle}>
          <input type="checkbox" onClick={handleHideMovesSelect} />
          Hide Moves
        </label>
        <label style={labelStyle}>
          Difficulty
          <select onChange={handleDifficultySelect}>
            <option value="easy">Easy (Random AI)</option>
            <option value="normal">Normal (AlphaBeta AI)</option>
          </select>
        </label>
      </div>
      {game.playerColor && <GameBoard />}
    </div>
  );
};

export default GameContainer;
