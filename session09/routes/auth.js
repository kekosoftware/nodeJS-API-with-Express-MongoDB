const express = require('express')
const config  = require('config')
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcrypt')
const Usuario = require('../models/usuario_model')

//const Joi     = require('joi');
const ruta    = express.Router()

ruta.post('/', (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((datos) => {
      if(datos){
        const passwordValido = bcrypt.compareSync(req.body.password, datos.password)
        if(!passwordValido) return res.status(400).json({error: 'ok', msj: "Usuario o contraseña incorrecta"})
        // const jwtToken = jwt.sign({ 
        //     _id: datos._id,
        //     nombre: datos.nombre,
        //     email: datos.email
        //   }, 
        //   'password');
        const jwtToken = jwt.sign({
              _id:    datos._id,
              nombre: datos.nombre,
              email:  datos.email
          }, 
          config.get('configToken.SEED'), 
          { 
            expiresIn: config.get('configToken.expiration')
        });
        res.json({
          usuario: {
            _id:    datos._id,
            nombre: datos.nombre,
            email:  datos.email
          },
          jwtToken
        })
      }
      else {
        res.status(400).json({
          error: 'ok',
          mjs:   "Usuario o contraseña incorrecta"
        })
      }
    }).catch((err) => {
      res.status(400),json({
        error:'ok',
        msj:  "Error en el servicio" + err
      })
    });
})


module.exports = ruta;