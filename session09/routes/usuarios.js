const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
  res.json('Listo el GET de usuarios')
})

ruta.post('/', (req, res) => {
  let body = req.body
  let resultado = crearUsuario(body)
  
  resultado.then( user => {
    res.json({
      valor: user
    })
  }).catch( err => {
    res.status(400).json({
      error: err
    })
  })
})

ruta.put('/:email', (req, res) => {
  let resultado = actualizarUsuario(req.params.email, req.body)

  console.log("body: " + req.body.nombre + " - " + req.body.password)

  resultado.then(valorP => {
    res.json({
      valor: valorP
    })
  }).catch( err => {
    res.status(400).json({
      error: err
    })
  })
})

async function crearUsuario(body){
  let usuario = new Usuario({
      email       : body.email,
      nombre      : body.nombre,
      password    : body.password
  });
  return await usuario.save();
}

async function actualizarUsuario(email, body){
  const filter = { 'email': email }
  const update = { 
    nombre  : body.nombre,
    password: body.password
  }

  console.log(update)
  
  // let usuario = await Usuario.findOneAndUpdate({"email": email}, {
  //   $set: {
  //     nombre  : body.nombre,
  //     password: body.password
  //   }
  // }, {new: true})

  let usuarioP = await Usuario.findOneAndUpdate(filter, update, {
    new: true
  })
  return usuarioP;
}

module.exports = ruta;