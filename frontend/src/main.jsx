import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' 
import { GameProvider } from './components/contexto/gameContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GameProvider>
)