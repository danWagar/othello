import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { Statistics } from '../../statistics';
import Stat from '../Stat/Stat';
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

  const heroCapturePerTurn = (heroTotalPiecesCaptured / heroNumberMoves).toFixed(1);
  const opponentCapturePerTurn = (opponentTotalPiecesCaptured / opponentNumberMoves).toFixed(1);
  const heroSecondsPerTurn = (heroTotalTime / heroNumberMoves / 1000).toFixed(2);
  const opponentSecondsPerTurn = (opponentTotalTime / opponentNumberMoves / 1000).toFixed(2);

  const getWinner = () => {
    if (score[playerColor as 'w' | 'b'] > score[playerColor === 'w' ? 'b' : 'w']) return 'You Won!';
    else if (score[playerColor as 'w' | 'b'] < score[playerColor === 'w' ? 'b' : 'w']) return 'You Lost';
    return 'You Tied';
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
      <span>{getWinner()}</span>
      <Stat title={'Captures Per Turn'} heroStat={heroCapturePerTurn} opponentStat={opponentCapturePerTurn} />
      <Stat title={'Seconds Per Turn'} heroStat={heroSecondsPerTurn} opponentStat={opponentSecondsPerTurn} />
      <button onClick={handleNewGameClick}>New Game</button>
    </div>
  );
};

export default GameOver;
