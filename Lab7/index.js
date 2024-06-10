import express from 'express';
import generarSerieFibonacci from './fibonacci';

const app = express();
const port = 3000;

app.get('/fibonacci', (req, res) => {
    const number = parseInt(req.query.number, 10);

    if (isNaN(number) || number < 1) {
        return res.status(400).json({ error: 'El parámetro debe ser un número entero mayor o igual a 1.' });
    }

    const fibonacciSeries = generarSerieFibonacci(number);
    res.json(fibonacciSeries);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});