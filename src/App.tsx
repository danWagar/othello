import React, { useState } from 'react';
import Gameboard from './Components/Gameboard/Gameboard';
import initialGameboard from './initialGameboard';
import './App.css';

function App() {
  const [gameboard, setGameboard] = useState<string[][]>(initialGameboard);

  return (
    <div className="App">
      <Gameboard gameState={gameboard} />
    </div>
  );
}

export default App;
