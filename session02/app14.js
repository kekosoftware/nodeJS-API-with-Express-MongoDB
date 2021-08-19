//  Funciones callback

function Mensaje(callback) {
  console.log("Mensaje antes de la llamada callaback")
  callback();
}

function Saludo(){
  console.log("Saludo despues de la llamada al callback");
}

Mensaje(Saludo)


function Sumar(num1, num2, callback) {
  let resultado = num1 + num2
  callback(resultado);
}

function Resultado(resu){
  console.log("El resultado es: " + resu);
}

Sumar(5, 8, Resultado)

setTimeout(function(){
  console.log("Esto se va a ejecutar después de 3 segundos");
}, 3000)

setTimeout(() => 
  console.log("Esto se va a ejecutar después de 6 segundos")
, 3000) 