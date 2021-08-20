//  Serie Fibonacci
// 1  1 2 3 5 8 13 21 34 ...

const serie = require('./serie')

let cantidad = 10

serie.crearSerie(cantidad)
  .then(msj => console.log(msj))
  .catch(msj => console.log(msj))