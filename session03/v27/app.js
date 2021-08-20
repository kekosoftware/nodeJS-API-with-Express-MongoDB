//  Modulo Http

const http = require('http')
const server = http.createServer()

server.on('connection', (puerto) => {
  console.log('Nueva conexion')
})

server.listen(3000)

console.log('Servidor escuchando en el puerto 3000')