//  Modulo Http

const http = require('http')
const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.write('Hola Ariel');
    res.end();
  }

  if(req.url === '/api/productos'){
    res.write(JSON.stringify(['mouse', 'teclado', 'parlantes']));
    res.end();
  }
})

// server.on('connection', (puerto) => {
//   console.log('Nueva conexion')
// })

server.listen(3000)

console.log('Servidor escuchando en el puerto 3000')