//  Modulo Events

const EventEmitter = require('events');

const emitterObj = new EventEmitter();

// Registrar el listener
emitterObj.on('mensajeAriel', function(arg){
  console.log('Listener llamado...', arg)
})

//  Registrar el evento
emitterObj.emit('mensajeAriel', { id:1, url:'http://test.com'})