// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Inicializa el servidor
const app = express();
const port = 5000; // Cambiar a 5000 para evitar conflictos con el frontend

app.use(cors()); // Permite las solicitudes CORS desde el frontend
app.use(express.json()); // Para manejar JSON en las solicitudes

app.get('/api/dificultad/:nivel', (req, res) => {
  const { nivel } = req.params;
  let mensaje = '';

  if (nivel === 'facil');
  if (nivel === 'intermedio');
  if (nivel === 'dificil');

  res.json({ mensaje });
});


// Ruta para manejar la selección de preguntas de acuerdo a la categoría y dificultad
app.get('/api/preguntas/:categoria/:dificultad', (req, res) => {
  const { categoria, dificultad } = req.params;

  // Cargar el archivo JSON
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

  // Verificar si la categoría y dificultad existen
  if (data.categorias[categoria] && data.categorias[categoria][dificultad]) {
    res.json(data.categorias[categoria][dificultad]);
  } else {
    res.status(404).json({ mensaje: 'No se encontraron preguntas para esta categoría o dificultad.' });
  }
});

// Arranca el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`
    );  
});

