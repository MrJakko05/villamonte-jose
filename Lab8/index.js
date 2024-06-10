const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Pseudo-base de datos
let financialData = {
  ingresos: [],
  egresos: []
};

// Controlador para almacenar ingresos
app.post('/api/ingresos', (req, res) => {
  const { username, amount } = req.body;
  if (!username || !amount) {
    return res.status(400).send('Faltan datos en la solicitud');
  }
  financialData.ingresos.push({ username, amount });
  res.status(201).send('Ingreso almacenado correctamente');
});

// Controlador para leer ingresos
app.get('/api/ingresos', (req, res) => {
  res.json(financialData.ingresos);
});

// Controlador para almacenar egresos
app.post('/api/egresos', (req, res) => {
  const { username, amount } = req.body;
  if (!username || !amount) {
    return res.status(400).send('Faltan datos en la solicitud');
  }
  financialData.egresos.push({ username, amount });
  res.status(201).send('Egreso almacenado correctamente');
});

// Controlador para leer egresos
app.get('/api/egresos', (req, res) => {
  res.json(financialData.egresos);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});