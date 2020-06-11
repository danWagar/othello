import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
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
import './Gameboard.css';

interface iCounts {
  b: number;
  w: number;
  p: number;
}

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)

const Gameboard: React.FC = () => {
  const { game, setGame } = useContext(GameContext);

  const { gameOver, playerColor, currentPlayerTurn, initialGameboard, score } = game;
  const [gameBoard, setGameBoard] = useState<string[][]>(initialGameboard);

  const statistics = useStatistics();

  let startTime = Date.now();

  useEffect(() => {
    if (gameOver) return;

    const boardCopy = searchForMoves(gameBoard, currentPlayerTurn);
    setGameBoard(boardCopy);

    const counts = getBoardCount(boardCopy);

    const newScore = { b: counts.b, w: counts.w };

    setGame({ ...game, score: { ...newScore } });

    if (checkGameOver(counts, currentPlayerTurn, boardCopy)) {
      setGame({ ...game, gameOver: true });
      return;
    }

    if (counts.p === 0) switchTurns();

    if (currentPlayerTurn !== playerColor) {
      const move = getRandomMove(boardCopy);
      setTimeout(() => {
        if (!move) {
          switchTurns();
          return;
        }
        handleBoardUpdate(move.i, move.j, counts);
      }, 700);
    }
  }, [currentPlayerTurn]);

  const switchTurns = () => {
    startTime = Date.now();
    setGame({ ...game, currentPlayerTurn: currentPlayerTurn === 'w' ? 'b' : 'w' });
  };

  const handleBoardUpdate = (i: number, j: number, oldCounts?: iCounts) => {
    const changedBoard = updateBoard(gameBoard, i, j, currentPlayerTurn);
    let oldScore: { b: number; w: number } | null = null;

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

    setGameBoard(changedBoard);
    switchTurns();
  };

  const handleSquareClick = (e: React.MouseEvent<HTMLLIElement>) => {
    //if (currentPlayerTurn !== playerColor) return;

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
              <GamePiece type={square} />
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
