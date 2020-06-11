import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import initialGameboard from '../initialGameboard';

type Props = {
  children: React.ReactNode;
};

export type Score = {
  b: number;
  w: number;
};

export type Game = {
  score: Score;
  currentPlayerTurn: string;
  playerColor: 'w' | 'b' | '';
  displayMoves: boolean;
  gameOver: boolean;
  start: boolean;
  initialGameboard: string[][];
};

type Context = {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
};

const initialContext: Context = {
  game: {
    score: { b: 2, w: 2 },
    currentPlayerTurn: 'b',
    playerColor: '',
    displayMoves: true,
    gameOver: false,
    start: false,
    initialGameboard: initialGameboard,
  },
  setGame: (value: SetStateAction<Game>) => {},
};

const GameContext = createContext<Context>(initialContext);

const GameContextProvider: React.FC = (props) => {
  const [game, setGame] = useState<Game>(initialContext.game);

  return <GameContext.Provider value={{ game, setGame }}>{props.children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
