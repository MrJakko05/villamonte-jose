/********************************/
/********** PROBLEMA 2 **********/
/********************************/
console.log("******* PROBLEMA 2 *******");

// Declarar dos variables con la palabra reservada "var"
var num1 = 5;
var num2 = 26;

// Imprimir el resultado de las operaciones de "Suma", "Resta", "Multiplicación" y "División" en la consola
console.log("\nSuma:", num1 + num2);
console.log("Resta:", num1 - num2);
console.log("Multiplicación:", num1 * num2);
console.log("División:", num1 / num2);

/********************************/
/********** PROBLEMA 3 **********/
/********************************/
console.log("\n******* PROBLEMA 3 *******");

// Declarar dos variables con la palabra reservada "let"
let palabra1 = "Desarrollo de ";
let palabra2 = "Software 9";

// Imprimir la concatenación de ellas
console.log("\nConcatenación de texto: ", palabra1 + palabra2);

/********************************/
/********** PROBLEMA 4 **********/
/********************************/
console.log("\n******* PROBLEMA 4 *******");

const booleano = true;
const numerico = 3

console.log("\n");
console.log(typeof booleano);
console.log(typeof numerico);

/********************************/
/********** PROBLEMA 5 **********/
/********************************/
console.log("\n******* PROBLEMA 5 *******");

// Declarar una variable tipo Objeto, colocar 4 llaves dentro de él que contengan un number, un string, un booleano y un objeto vacío, en ese mismo orden.
var Objeto = {
    "numero": 10,
    "cadenaDeTexto": "Hello World",
    "booleano": true,
    "objetoVacio": {} 
}

// Imprimir Objecto con 4 llaves
console.log("\n");
console.log("Objeto", Objeto);

/********************************/
/********** PROBLEMA 6 **********/
/********************************/
console.log("\n******* PROBLEMA 6 *******");

// Escribir una función en JS que tome un número entero positivo como argumento y devuelva la suma de todos los números menores que sean múltiplos de 3 o 5.
function multiple3and5(num) {
    let suma = 0;
    for (let i = 1; i < num; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            suma += i;
        }
    }
    return suma;
}

// Imprimir función
console.log("\n");
console.log(multiple3and5(21));