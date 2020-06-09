import React from 'react';
import './Score.css';

type score = {
  b: number;
  w: number;
};

interface iScore {
  score: score;
}

const Score: React.FC<iScore> = (props) => {
  const { score } = props;

  return (
    <div className="Score">
      <div className="Score_container">
        <span className="Score_player">Black</span>
        <div className="Score_score">{score.b}</div>
      </div>
      <div className="Score_container">
        <span className="Score_player">White</span>
        <div className="Score_score">{score.w}</div>
      </div>
    </div>
  );
};

export default Score;
