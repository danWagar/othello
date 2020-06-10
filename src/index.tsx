import React from 'react';
import ReactDOM from 'react-dom';
import { GameContextProvider } from './Context/GameContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
