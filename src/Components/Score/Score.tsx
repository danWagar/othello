import React from 'react';
import classNames from 'classnames';
import './Score.css';

type score = {
  b: number;
  w: number;
  current: string;
};

interface iScore {
  score: score;
}

const Score: React.FC<iScore> = (props) => {
  const { score } = props;

  return (
    <div className="Score">
      <div className={classNames('Score_container', { Score_highlight: score.current === 'b' })}>
        <span className="Score_player">Black</span>
        <div className="Score_score">{score.b}</div>
      </div>
      <div className={classNames('Score_container', { Score_highlight: score.current === 'w' })}>
        <span className="Score_player">White</span>
        <div className="Score_score">{score.w}</div>
      </div>
    </div>
  );
};

export default Score;
