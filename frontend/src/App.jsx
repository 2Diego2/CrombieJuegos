import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';

function DifficultySelection() {
  const [dificultad, setDificultad] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarSeleccion = async (nivel) => {
    try {
      const respuesta = await axios.get(`http://localhost:5000/api/dificultad/${nivel}`);
      setMensaje(respuesta.data.mensaje);
      setDificultad(nivel);
    } catch (error) {
      console.error('Error al obtener el mensaje:', error);
    }
  };

  return (
    <div className="App">
      <h1>Selecciona la dificultad</h1>
      <div>
        <button onClick={() => manejarSeleccion('facil')}>Fácil</button>
        <button onClick={() => manejarSeleccion('intermedio')}>Intermedio</button>
        <button onClick={() => manejarSeleccion('dificil')}>Difícil</button>
      </div>
      {dificultad && (
        <div>
          <h2>{mensaje}</h2>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/difficulty" element={<DifficultySelection />} />
    </Routes>
  );
}

export default App;