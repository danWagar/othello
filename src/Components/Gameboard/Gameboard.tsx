import React, { useState, useEffect, useContext } from 'react';
import { GameContext, Score } from '../../Context/GameContext';
import GamePiece from '../GamePiece/GamePiece';
import GameOver from '../GameOver/GameOver';
import { useStatistics } from '../../statistics';
import {
  searchForMoves,
  updateBoard,
  getBoardCount,
  getRandomMove,
  checkGameOver,
} from '../../gameAlgorithms';
import { getMinMaxMove } from '../../alphaBeta';
import './Gameboard.css';

interface iCounts {
  b: number;
  w: number;
  p: number;
}

interface iMove {
  i: number;
  j: number;
}

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)

const Gameboard: React.FC = () => {
  const { game, setGame } = useContext(GameContext);

  const { gameOver, playerColor, currentPlayerTurn, initialGameboard, score, difficulty } = game;
  const [gameBoard, setGameBoard] = useState<string[][]>(initialGameboard);
  const [lastMove, setLastMove] = useState<iMove | null>(null);

  const statistics = useStatistics();

  let startTime = Date.now();

  useEffect(() => {
    if (gameOver) return;

    const boardCopy = searchForMoves(gameBoard, currentPlayerTurn);
    setGameBoard(boardCopy);

    const counts = getBoardCount(boardCopy);

    const newScore = { b: counts.b, w: counts.w };

    if (checkGameOver(counts, currentPlayerTurn, boardCopy)) {
      setGame({ ...game, score: { ...newScore }, gameOver: true });
      return;
    } else setGame({ ...game, score: { ...newScore } });

    if (counts.p === 0) {
      switchTurns();
      return;
    }

    if (currentPlayerTurn !== playerColor && difficulty !== 'none') {
      let move: { i: number; j: number } | null;
      let depth = 5;
      if (difficulty === 'easy') move = getRandomMove(boardCopy);
      else {
        let totalPieces = counts.b + counts.w;
        if (totalPieces > 45) depth = 6;
        else if (totalPieces > 50) depth = 7;
        else if (totalPieces > 55) depth = 10;
      }

      setTimeout(
        () => {
          if (difficulty === 'normal')
            move = getMinMaxMove(boardCopy, playerColor === 'w' ? 'b' : 'w', depth);
          if (!move) {
            //This should not happen
            console.log('Error: AI did not return a result');
            switchTurns();
            return;
          }
          handleBoardUpdate(move.i, move.j, counts);
        },
        difficulty === 'easy' ? 700 : 100
      );
    }
  }, [currentPlayerTurn]);

  const switchTurns = () => {
    startTime = Date.now();
    setGame({ ...game, currentPlayerTurn: currentPlayerTurn === 'w' ? 'b' : 'w' });
  };

  const handleBoardUpdate = (i: number, j: number, oldCounts?: iCounts) => {
    const changedBoard = updateBoard(gameBoard, i, j, currentPlayerTurn);
    let oldScore: Score | null = null;

    const counts = getBoardCount(changedBoard);
    if (oldCounts) oldScore = { b: oldCounts.b, w: oldCounts.w };
    const newScore = { b: counts.b, w: counts.w };

    statistics.updateStatistics(
      newScore,
      Date.now() - startTime,
      currentPlayerTurn,
      playerColor as 'w' | 'b',
      oldScore || score
    );

    setLastMove({ i: i, j: j });
    setGameBoard(changedBoard);
    switchTurns();
  };

  const handleSquareClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (currentPlayerTurn !== playerColor && difficulty !== 'none') return;

    const row = parseInt(e.currentTarget.getAttribute('data-row')!);
    const column = parseInt(e.currentTarget.getAttribute('data-column')!);

    if (gameBoard[row][column] !== 'p') return;

    handleBoardUpdate(row, column);
  };

  const getGameboardJSX = () => {
    return gameBoard.map((row, i) => {
      return (
        <ul key={i} className="Gameboard_row">
          {row.map((square, j) => (
            <li key={j} data-row={i} data-column={j} onClick={handleSquareClick}>
              <GamePiece type={square} wasLastMove={!!lastMove && lastMove.i === i && lastMove.j === j} />
            </li>
          ))}
        </ul>
      );
    });
  };

  return (
    <div className="Gameboard">
      {gameOver && <GameOver statistics={statistics.getStatistics()} />}
      {getGameboardJSX()}
    </div>
  );
};

export default Gameboard;
