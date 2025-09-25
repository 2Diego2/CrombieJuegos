import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/css/home.css"

export default function Home() {
  const navigate = useNavigate();

  const iniciarJuego = () => {
    navigate('/difficulty');
  };

  return (
    <div className="home-container">
      <img className="header-img" src="cropped2.svg" alt="Logo"/>

      <main className="main-content">
        <button
          className="start-game-button"
          onClick={iniciarJuego}
        >
          Iniciar Juego
        </button>
      </main>

      <footer className="footer-section">
        <button
          className="gestor-button"
          onClick={() => {
            console.log("Gestor clicked")
          }}
        >
          gestor
        </button>
      </footer>
    </div>
  )
}