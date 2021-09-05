const express = require('express');
const Curso = require('../models/curso_models');
const Joi     = require('joi');
const verificarToken = require('../middlewares/auth')
const ruta    = express.Router();

const schema = Joi.object({
  titulo: Joi.string()
      .min(3)
      .max(10)
      .required(),

  descripcion: Joi.string()
      .min(5)
      .required(),
});

ruta.get('/', verificarToken, (req, res) => {
  let resultado = listarCursosActivos();
  resultado.then(cursos => {
    res.json(cursos)
  }).catch(err => {
    res.status(400).json({
      error: err
    })
  })
})

ruta.post('/', verificarToken, (req, res) => {
  let body = req.body

  const {error, value} = schema.validate({titulo: body.titulo, descripcion: body.descripcion})

  if(!error){
    let resultado = crearCurso(body)

    resultado.then(curso => {
      res.json({
        valor: curso
      })
    }).catch( err => {
      res.status(400).json({
        error: err
      })
    })
  }
  else{
    res.status(400).json({
      error: error
    })
  }
})

ruta.put('/:id', verificarToken, (req, res) => {
  
  const {error, value} = schema.validate({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion
  })
  
  if(!error){
    let resultado = actualizarCurso(req.params.id, req.body)
    resultado.then(curso => {
      res.json({
        valor: curso
      })
    }).catch( err => {
      res.status(400).json({
        error: err
      })
    })
  }
  else {
    res.status(400).json({
      error: error
    })
  }
})

ruta.delete('/:id', verificarToken, (req, res) => {
  let resultado = desactivarCurso(req.params.id)
  resultado.then( curso => {
    res.json({ valor: curso })
  }).catch(err => {
    res.status(400).json({
      error: err
    })
  })
})


async function listarCursosActivos(){
  let cursos = await Curso.find({"estado": true})
  return cursos;
}

async function crearCurso(body){
  let curso = new Curso({
    titulo      : body.titulo,
    descripcion : body.descripcion
  })
  return await curso.save();
}

async function actualizarCurso(id, body){
  const update = { 
    titulo      : body.nombre,
    descripcion : body.descripcion
  }

  let curso = await Curso.findByIdAndUpdate(id, update, {
    new: true
  })
  return curso;
}

async function desactivarCurso(id){
  const update = { 'estado' : false}
  let curso = await Curso.findByIdAndUpdate(id, update, { new: true})

  return curso;
}

module.exports = ruta;