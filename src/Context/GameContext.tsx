import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type Score = {
  b: number;
  w: number;
};

export type Game = {
  score: Score;
  currentPlayerTurn: string;
  playerColor: string;
  displayMoves: boolean;
  gameOver: boolean;
  start: boolean;
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
  },
  setGame: (value: SetStateAction<Game>) => {},
};

const GameContext = createContext<Context>(initialContext);

const GameContextProvider: React.FC = (props) => {
  const [game, setGame] = useState<Game>(initialContext.game);

  return <GameContext.Provider value={{ game, setGame }}>{props.children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
