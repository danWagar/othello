import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import classNames from 'classnames';
import './Score.css';

const Score: React.FC = () => {
  const { game, setGame } = useContext(GameContext);
  const { score, start, currentPlayerTurn, playerColor, gameOver } = game;

  const handleChoiceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (start) return;

    const value = e.currentTarget.getAttribute('data-id') as 'w' | 'b' | '';

    setGame({ ...game, playerColor: value!, start: true });
  };

  return (
    <div className="Score">
      <div
        className={classNames('Score_container', {
          Score_highlight: currentPlayerTurn === 'b' && start,
          Score_choose_color_black: !start && !playerColor,
        })}
        data-id="b"
        onClick={handleChoiceClick}
      >
        <span className="Score_player">Black</span>
        <div className="Score_score">{(start || gameOver) && score.b}</div>
      </div>
      {!start && <div className="Score_choose">Choose a color</div>}
      <div
        className={classNames('Score_container', {
          Score_highlight: currentPlayerTurn === 'w' && start,
          Score_choose_color_white: !start && !playerColor,
        })}
        data-id="w"
        onClick={handleChoiceClick}
      >
        <span className="Score_player">White</span>
        <div className="Score_score">{(start || gameOver) && score.w}</div>
      </div>
    </div>
  );
};

export default Score;
