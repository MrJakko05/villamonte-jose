import express from 'express';
import cors from 'cors';
import generarSerieFibonacci from './fibonacci';

const app = express();
const port = 3000;

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Endpoint para obtener la serie de Fibonacci
app.get('/fibonacci', (req, res) => {
    const number = parseInt(req.query.number, 10);

    if (isNaN(number) || number < 1) {
        return res.status(400).json({ error: 'El parámetro debe ser un número entero mayor o igual a 1.' });
    }

    const fibonacciSeries = generarSerieFibonacci(number);
    res.json(fibonacciSeries);
});

// Iniciar el servidor
app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));