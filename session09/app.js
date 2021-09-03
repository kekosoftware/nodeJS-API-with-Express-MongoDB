const usuarios  = require('./routes/usuarios')
const express   = require('express')
const mongoose  = require('mongoose')

mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.log('No se pudo conectar con MongoDB ..', err))

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/usuarios', usuarios)


const port =  process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api RESTFul OK, y ejecutandose...')
})