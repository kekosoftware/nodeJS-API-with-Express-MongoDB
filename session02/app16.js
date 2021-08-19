//  Async - Aways

function mensaje() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(true){
        resolve("Esto se va a ejecutar después de 3 segundos")
      }
      else {
        reject("Hubo un error")
      }
    }, 2000)   
  })
}

async function llamadaAsync(){
  console.log("Llamada... ")
  const resultado = await mensaje()
  return resultado
}

llamadaAsync().then(x => console.log(x)).catch(e =>console.log(e ))