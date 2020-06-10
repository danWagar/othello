import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Score.css';

type score = {
  b: number;
  w: number;
  current: string;
};

interface iScore {
  score: score;
  updateColor: (color: string) => void;
  newGame: boolean;
  startGame: () => void;
}

const Score: React.FC<iScore> = (props) => {
  const { score, updateColor, newGame, startGame } = props;
  const [start, setStart] = useState<boolean>(newGame);

  if (newGame !== start) setStart(newGame);

  const handleChoiceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!newGame) return;
    const value = e.currentTarget.getAttribute('data-id');
    updateColor(value!);
    setStart(false);
    startGame();
  };

  return (
    <div className="Score">
      <div
        className={classNames('Score_container', { Score_highlight: score.current === 'b' })}
        data-id="b"
        onClick={handleChoiceClick}
      >
        <span className="Score_player">Black</span>
        <div className="Score_score">{score.b}</div>
      </div>
      {start && <div>Choose a color</div>}
      <div
        className={classNames('Score_container', { Score_highlight: score.current === 'w' })}
        data-id="w"
        onClick={handleChoiceClick}
      >
        <span className="Score_player">White</span>
        <div className="Score_score">{score.w}</div>
      </div>
    </div>
  );
};

export default Score;
