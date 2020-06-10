import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import initialGameboard from '../../initialGameboard';
import GamePiece from '../GamePiece/GamePiece';
import {
  searchForMoves,
  updateBoard,
  getBoardCount,
  getRandomMove,
  checkGameOver,
} from '../../gameAlgorithms';
import './Gameboard.css';

//our gameboard is a 2d string array where the empty string represents a blank square,
//'w' represents a square occupied by the white player
//'b' represents a square occupied by the black player
//'p' represents potential moves for current player (after being passed through search algorithm)
interface iScore {
  b: number;
  w: number;
  current: string;
}

const Gameboard: React.FC = () => {
  const { game, setGame } = useContext(GameContext);

  const { gameOver, playerColor, currentPlayerTurn } = game;
  const [gameBoard, setGameBoard] = useState<string[][]>(initialGameboard);

  useEffect(() => {
    if (gameOver) return;

    const boardCopy = searchForMoves(gameBoard, currentPlayerTurn);
    setGameBoard(boardCopy);

    const counts = getBoardCount(boardCopy);

    setGame({ ...game, score: { b: counts.b, w: counts.w } });

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
        handleBoardUpdate(move.i, move.j);
      }, 200);
    }
  }, [currentPlayerTurn]);

  const switchTurns = () => {
    setGame({ ...game, currentPlayerTurn: currentPlayerTurn === 'w' ? 'b' : 'w' });
  };

  const handleBoardUpdate = async (i: number, j: number) => {
    const changedBoard = await updateBoard(gameBoard, i, j, currentPlayerTurn);
    console.log('changed board is ', changedBoard);
    setGameBoard(changedBoard);
    switchTurns();
  };

  const handleSquareClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (currentPlayerTurn !== playerColor) return;

    const row = parseInt(e.currentTarget.getAttribute('data-row')!);
    const column = parseInt(e.currentTarget.getAttribute('data-column')!);

    if (gameBoard[row][column] !== 'p') return;

    handleBoardUpdate(row, column);
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
    setGameBoard(initialGameboard);
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
      {gameOver && (
        <div className="Gameboard_game_over">
          <span>Game Over!</span>
          <button onClick={handleNewGameClick}>New Game</button>
        </div>
      )}
      {getGameboardJSX()}
    </div>
  );
};

export default Gameboard;
