import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import './GameOptions.css';

const GameOptions: React.FC = () => {
  const { game, setGame } = useContext(GameContext);

  const { difficulty, start, playerColor, currentPlayerTurn } = game;

  const disableSelect = start && difficulty === 'none' && currentPlayerTurn !== playerColor;

  const handleHideMovesSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    setGame({ ...game, displayMoves: !value });
  };

  const handleDifficultySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as 'easy' | 'normal';
    setGame({ ...game, difficulty: value });
  };

  return (
    <div className="GameOptions">
      <label>
        <input type="checkbox" onClick={handleHideMovesSelect} />
        Hide Moves
      </label>
      <label>
        Difficulty:
        <select
          className="GameOptions_difficulty"
          value={difficulty}
          onChange={handleDifficultySelect}
          disabled={disableSelect}
        >
          <option value="easy">Easy (Random)</option>
          <option value="normal">Normal (AlphaBeta)</option>
          {}
          <option value="none">Turn off AI</option>
        </select>
      </label>
    </div>
  );
};

export default GameOptions;
