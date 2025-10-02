import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(null);
  
  const setGameDifficulty = (nivel) => {
    setDifficulty(nivel);
  };

  return (
    <GameContext.Provider value={{ difficulty, setGameDifficulty }}>
      {children}
    </GameContext.Provider>
  );
};

// NOTA: Debes envolver tu aplicación (ej. en App.js) con <GameProvider>