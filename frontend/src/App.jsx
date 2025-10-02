import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexto/gameContext.jsx'; // ¡Revisa la ruta!
import Home from './pages/Home';
import DifficultySelection from './pages/DifficultySelection';
import Dashboard from './pages/Dashboard';
import Ruleta from './pages/Ruleta';
import Configuracion from './pages/Configuracion';
import SlotJuego from './pages/slotJuego';
import './App.css';

function App() {
  return (
    <GameProvider>
    <div className="app-global-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/seleccion-dificultad" element={<DifficultySelection />} />
        <Route path="/registro/:dificultad" element={<Dashboard />} />
        <Route path="/ruleta/:dificultad" element={<Ruleta />} />
        <Route path="/slot-juego" element={<SlotJuego />} />
        {/* <Route path="/resultado" element={<Resultado />} /> */}
      </Routes>
    </div>
    </GameProvider>
  );
}

export default App;