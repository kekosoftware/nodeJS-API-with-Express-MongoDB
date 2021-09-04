const express = require('express')
const bcrypt  = require('bcrypt')
const Usuario = require('../models/usuario_model')
const { json } = require('express')
//const Joi     = require('joi');
const ruta    = express.Router()

ruta.post('/', (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((datos) => {
      if(datos){
        const passwordValido = bcrypt.compareSync(req.body.password, datos.password)
        if(!passwordValido) return res.status(400).json({error: 'ok', msj: "Usuario o contraseña incorrecta"})
        res.json(datos)
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