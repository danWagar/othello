import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { Statistics } from '../../statistics';
import './GameOver.css';

interface iGameOver {
  statistics: Statistics;
}

const GameOver: React.FC<iGameOver> = (props) => {
  const { statistics } = props;

  const {
    heroNumberMoves,
    opponentNumberMoves,
    heroTotalPiecesCaptured,
    opponentTotalPiecesCaptured,
    heroTotalTime,
    opponentTotalTime,
  } = statistics;

  const { game, setGame } = useContext(GameContext);

  const { playerColor, score } = game;

  const getWinner = () => {
    if (score[playerColor as 'w' | 'b'] > score[playerColor === 'w' ? 'b' : 'w']) return 'You Won!';
    return 'You Lost';
  };

  const handleNewGameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setGame({
      ...game,
      playerColor: '',
      currentPlayerTurn: 'b',
      gameOver: false,
      start: false,
      score: { b: 2, w: 2 },
    });
  };

  return (
    <div className="GameOver">
      <span>{getWinner()}</span>{' '}
      <ul className="GameOver_list">
        <li>You captured {(heroTotalPiecesCaptured / heroNumberMoves).toFixed(1)} pieces per turn</li>
        <li>Your opponent captured {(opponentTotalPiecesCaptured / opponentNumberMoves).toFixed(1)} </li>
        <li>You took {(heroTotalTime / heroNumberMoves / 1000).toFixed(2)} seconds per move</li>
        <li>
          Your opponent took {(opponentTotalTime / opponentNumberMoves / 1000).toFixed(2)} seconds per move
        </li>
      </ul>
      <button onClick={handleNewGameClick}>New Game</button>
    </div>
  );
};

export default GameOver;
