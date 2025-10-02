import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DifficultySelection.css';

export default function DifficultySelection() {
  const navigate = useNavigate();
  const [dificultad, setDificultad] = useState('');
  const manejarSeleccion = (nivel) => {
    console.log("Dificultad seleccionada:", nivel);
    setDificultad(nivel);
    // Navegar al slot machine pasando la dificultad
    navigate(`/registro/${nivel}`);
  };

  return (
    <div className="contenedor-dificultad">
      <h1 className='h1'>Elegí la dificultad:</h1>
      
      <div className="botones-dificultad">
        <button 
          className='boton-facil' 
          onClick={() => manejarSeleccion('facil')}
        >
          Fácil
        </button>
        <button 
          className='boton-intermedio' 
          onClick={() => manejarSeleccion('intermedio')}
        >
          Intermedio
        </button>
        <button 
          className='boton-dificil' 
          onClick={() => manejarSeleccion('dificil')}
        >
          Difícil
        </button>
      </div>
    </div>
  );
}