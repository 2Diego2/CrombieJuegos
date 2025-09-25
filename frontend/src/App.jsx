// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Solo necesitas estas importaciones
import Home from './pages/Home.jsx';
import DifficultySelection from './pages/DifficultySelection.jsx'; // <- ¡Aquí lo importas!

// ELIMINA la definición de la función DifficultySelection() de este archivo.

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Usas el componente que acabas de importar */}
            <Route path="/difficulty" element={<DifficultySelection />} />
        </Routes>
    );
}

export default App;