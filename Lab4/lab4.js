/************************************************************************/
/****************************** PROBLEMA 1 ******************************/
/************************************************************************/
const generararSerieFibonacci = (number) => {
    let series = [];
    let num1 = 0, num2 = 1, temp;
    for (let i = 0; i < number; i++) {
        series.push(num1);
        temp = num1 + num2;
        num1 = num2;
        num2 = temp;
    }
    return series;
};

document.getElementById("fibonacciForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const number = parseInt(document.getElementById("number").value);
    const fibonacciSeries = generararSerieFibonacci(number);
    const fibonacciCards = document.getElementById("fibonacciCards");
    fibonacciCards.innerHTML = "";
    fibonacciSeries.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = element;
        fibonacciCards.appendChild(card);
    });
});

/************************************************************************/
/****************************** PROBLEMA 2 ******************************/
/************************************************************************/

// Seleccionar el contenedor de las tarjetas
const fibonacciContainer = document.getElementById('fibonacciCards');

// Añadir un evento de click al contenedor de las tarjetas
fibonacciContainer.addEventListener('click', (event) => {
    // Verificar si se hizo click en una tarjeta
    if (event.target.classList.contains('card')) {
        // Mostrar una alerta al usuario
        const confirmDelete = confirm('¿Desea eliminar esta tarjeta?');
        
        // Si el usuario da click en "sí", eliminar la tarjeta
        if (confirmDelete) {
            event.target.remove();
        }
    }
});