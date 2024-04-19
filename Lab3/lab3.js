/************************************************************************/
/****************************** PROBLEMA 1 ******************************/
/************************************************************************/

const esPalindromo = (numero, base) => {
    const numStr = numero.toString(base);
    return numStr === numStr.split('').reverse().join('');
};

const varificarPalindromo = () => {
    const numberInput = document.getElementById('cadenaInput1').value;
    const numero = parseInt(numberInput, 10);
    if (isNaN(numero)) {
        document.getElementById('resultado1').innerText = 'Por favor, ingrese un número válido.';
        return;
    }
    
    const esPalindromeDoble = esPalindromo(numero, 10) && esPalindromo(numero, 2);
    document.getElementById('resultado1').innerText += esPalindromeDoble ? 'Es un palíndromo de doble base.' : 'No es un palíndromo de doble base.';
};

/************************************************************************/
/****************************** PROBLEMA 2 ******************************/
/************************************************************************/

// Función para contar caracteres
const contarCaracteres = (cadena) => {
    const contador = {};
    for (let i = 0; i < cadena.length; i++) {
        const caracter = cadena[i];
        contador[caracter] = (contador[caracter] || 0) + 1;
    }
    return contador;
};

// Función para formatear el resultado
const formatearResultado = (contador) => {
    let resultadoCadena = 'Hay: ';
    for (const caracter in contador) {
        resultadoCadena += `${contador[caracter]} (${caracter}), `;
    }
    return resultadoCadena.slice(0, -2);
};

// Función principal
const procesarCadena = () => {
    const cadena = document.getElementById('cadenaInput2').value;
    const resultado = document.getElementById('resultado2');
    
    const contador = contarCaracteres(cadena);
    const resultadoFormateado = formatearResultado(contador);
    
    resultado.textContent = resultadoFormateado;
};

/************************************************************************/
/****************************** PROBLEMA 3 ******************************/
/************************************************************************/

const esDivisiblePor = (a, divisor) => a % divisor === 0;

/* Un año es bisiesto si es divisible por 4, excepto si es divisible por 100. 
   Sin embargo, si un año es divisible por 400, entonces sí es bisiesto. */

const esBisiesto = (a) => {
    return (esDivisiblePor(a, 4) && !esDivisiblePor(a, 100)) || esDivisiblePor(a, 400)
        ? `${a} es bisiesto`
        : `${a} no es bisiesto`;
};

const comprobarBisiesto = () => {
    const año = document.getElementById('cadenaInput3').value;
    const resultado = esBisiesto(parseInt(año));
    document.getElementById('resultado3').innerText = resultado;
}

/************************************************************************/
/****************************** PROBLEMA 4 ******************************/
/************************************************************************/

// Un número primo debe tener exactamente dos divisores distintos: 1 y el número en sí mismo

// Función para verificar si un número es primo
function esPrimo(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }

    return true;
}

// Función para calcular la sumatoria de números primos debajo de un número dado
function sumatoriaNumerosPrimos(n) {
    let suma = 0;
    for (let i = 2; i <= n; i++) {
        if (esPrimo(i)) {
            suma += i;
        }
    }
    return suma;
}

// Función para obtener el número ingresado por el usuario y calcular la sumatoria
function calcularSumatoria() {
    const numero = parseInt(document.getElementById("cadenaInput4").value);
    if (isNaN(numero) || numero <= 0 || numero >= 1000000) {
        document.getElementById("resultado4").innerText = "Número inválido. Ingrese un número (0 < n < 1000000)";
        return;
    }
    
    const sumatoriaPrimos = sumatoriaNumerosPrimos(numero);
    document.getElementById("resultado4").innerText = `La sumatoria de números primos debajo de ${numero} es ${sumatoriaPrimos}`;
}