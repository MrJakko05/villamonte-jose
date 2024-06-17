// Función para obtener la serie de Fibonacci desde el backend
const getFibonacci = () => {
    // Obtener el número ingresado en el input
    const number = document.getElementById('numberInput').value;

    // Enviar una solicitud GET al backend con el número como query parameter
    fetch(`http://localhost:3000/fibonacci?number=${number}`)
        .then(response => response.json())
        .then(data => {
            // Mostrar la serie de Fibonacci en el elemento con id 'result'
            document.getElementById('result').textContent = `Serie Fibonacci: [${data.join(', ')}]`;
        })
        .catch(error => {
            // Manejar errores y mostrar un mensaje en el elemento con id 'result'
            console.error('Error obteniendo la serie Fibonacci:', error);
            document.getElementById('result').textContent = 'Error obteniendo la serie Fibonacci';
        });
}