// Promesas

const mensaje = new Promise((resolve, reject) => {
  setTimeout(() => {
    if(false){
      resolve("Esto se va a ejecutar después de 3 segundos")
    }
    else {
      reject("Hubo un error")
    }
  }, 2000)   
})

mensaje
  .then( msj => {
    console.log(msj)
  })
  .catch( error => {
    console.log(error)
  })