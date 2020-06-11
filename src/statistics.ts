import { useState } from 'react';

type Colors = 'w' | 'b';

export type Statistics = {
  heroNumberMoves: number;
  opponentNumberMoves: number;
  heroTotalPiecesCaptured: number;
  opponentTotalPiecesCaptured: number;
  heroTotalTime: number;
  opponentTotalTime: number;
};

const initialStatistics = {
  heroNumberMoves: 0,
  opponentNumberMoves: 0,
  heroTotalPiecesCaptured: 0,
  opponentTotalPiecesCaptured: 0,
  heroTotalTime: 0,
  opponentTotalTime: 0,
};

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics>(initialStatistics);

  let {
    heroNumberMoves,
    opponentNumberMoves,
    heroTotalPiecesCaptured,
    opponentTotalPiecesCaptured,
    heroTotalTime,
    opponentTotalTime,
  } = statistics;

  return {
    updateStatistics: (
      newScore: { w: number; b: number },
      time: number,
      currentPlayerTurn: string,
      playerColor: Colors,
      score: { w: number; b: number }
    ) => {
      const opponentColor = playerColor === 'w' ? 'b' : 'w';

      if (currentPlayerTurn === playerColor) {
        heroNumberMoves++;
        heroTotalPiecesCaptured += score[opponentColor] - newScore[opponentColor];
        heroTotalTime += time;

        setStatistics({
          ...statistics,
          heroNumberMoves: heroNumberMoves,
          heroTotalPiecesCaptured: heroTotalPiecesCaptured,
          heroTotalTime: heroTotalTime,
        });
      } else {
        opponentNumberMoves++;
        opponentTotalPiecesCaptured += score[playerColor as Colors] - newScore[playerColor as Colors];
        opponentTotalTime += time;

        setStatistics({
          ...statistics,
          opponentNumberMoves: opponentNumberMoves,
          opponentTotalPiecesCaptured: opponentTotalPiecesCaptured,
          opponentTotalTime: opponentTotalTime,
        });
      }
    },

    getStatistics: () => {
      return statistics;
    },
  };
}
