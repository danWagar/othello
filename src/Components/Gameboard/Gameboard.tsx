import React, { useState, useEffect } from 'react';
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

interface iGameboard {
  gameState: string[][];
  updateScore: (score: iScore) => void;
  playerColor: string;
  newGame: () => void;
}

const Gameboard: React.FC<iGameboard> = (props) => {
  const { gameState, updateScore, playerColor, newGame } = props;
  //valid options for playerTurn are 'w' and 'b';
  const [playerTurn, setPlayerTurn] = useState<string>('b');
  const [gameBoard, setGameBoard] = useState<string[][]>(gameState);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (gameOver) return;

    const boardCopy = searchForMoves(gameBoard, playerTurn);
    setGameBoard(boardCopy);

    const counts = getBoardCount(boardCopy);

    updateScore({ b: counts.b, w: counts.w, current: playerTurn });

    if (checkGameOver(counts, playerTurn, boardCopy)) {
      setGameOver(!gameOver);
      return;
    }

    if (counts.p === 0) switchTurns();

    if (playerTurn !== playerColor) {
      const move = getRandomMove(boardCopy);
      setTimeout(() => {
        if (!move) {
          switchTurns();
          return;
        }
        handleBoardUpdate(move.i, move.j);
      }, 200);
    }
  }, [playerTurn]);

  const switchTurns = () => {
    setPlayerTurn(playerTurn === 'w' ? 'b' : 'w');
  };

  const handleBoardUpdate = async (i: number, j: number) => {
    const changedBoard = await updateBoard(gameBoard, i, j, playerTurn);
    console.log('changed board is ', changedBoard);
    setGameBoard(changedBoard);
    switchTurns();
  };

  const handleSquareClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (playerTurn !== playerColor) return;

    const row = parseInt(e.currentTarget.getAttribute('data-row')!);
    const column = parseInt(e.currentTarget.getAttribute('data-column')!);

    if (gameBoard[row][column] !== 'p') return;

    handleBoardUpdate(row, column);
  };

  const handleNewGameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPlayerTurn('b');
    setGameBoard(gameState);
    setGameOver(false);
    newGame();
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
