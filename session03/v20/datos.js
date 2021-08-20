var url ='http://kekosoftware.com.ar/datos'

function dato(msj){
  // Envie Http request
  console.log(msj)
}

module.exports.log = dato
module.exports.url = url

console.log(module)