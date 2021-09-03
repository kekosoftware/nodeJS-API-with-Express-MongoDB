const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.log('No se pudo conectar con MongoDB ..', err))

const cursoSchema = new mongoose.Schema({
  nombre    : String,
  autor     : String,
  etiquetas : [String],
  fecha     : {type: Date, default:Date.now},
  publicado : Boolean
})

const Curso = mongoose.model('Curso', cursoSchema)

async function crearCurso() {
  const curso = new Curso({
    nombre      : 'PHP',
    autor       : 'Sander',
    etiquetas   : ['desarrollo web', 'back end'],
    publicado   : true
  })
  
  const resultado = await curso.save()
  console.log(resultado)

}

// crearCurso();

async function listarCursos(){
  //  eq (equal, igual)
  //  ne (not equal, distinto)
  //  gt (greater than, mayor que)
  //  gte(greater than or equal to, mayor o igual que)
  //  lt (less than, menor que)
  //  lte(less than or equal to, menor o igual que)
  //  in
  //  nin (bçnot in)
  //  or
  //  and
  const numeroPage  = 1;
  const sizePage    = 2;
  // api/cursos?numeroPage=4&sizePage=10

  const cursos = await Curso
    // .find({publicado : true})              // it's how where
    // .find({ precio: {$gte:10, $lte:30}})   // precios entre 10 y 30 pesos
    // .find({precio: {$in: [10, 15, 25]}})      // los cursos que cuestan 10, 15 y 25
    //   .find()
    //   .or([{autor:'Ariel'}, {publicado: true}])
    // Empiece con la palabra Ar
    //    .find({autor: /^Ar/})
    // Termina con la palabra el
    //     .find({autor: /el$/})
    //  Cuando un campo tiene un contenido específico
    .find({ autor: /.*r.*/})
    .skip((numeroPage - 1) * sizePage)
    .limit(sizePage)                          // amount of documents
    .sort({autor: 1})                   // 1 ascendente - (-1) descendente
    .select({nombre: 1, autor: 1, etiquetas: 1})  // kind of fields
  console.log(cursos);
}

// listarCursos();

async function actualizarCurso(id){
  const curso = await Curso.findById(id)
  if(!curso) {
    console.log("El curso no existe")
    return;
  }
  curso.publicado = false;
  curso.autor     = "Ariel Coronel"

  // curso.set({
  //   publicado: false,
  //   autor: 'Ariel Coronel'
  // })

  const resultado = await curso.save();
  console.log(resultado);
}

// actualizarCurso("613257b010bded06d4546f47");

async function actualizarCursoOtroUpdate(id){
  const resultado = await Curso.updateOne({_id: id}, {
    $set: {
      autor: 'Gustavo Ariel',
      publicado: true
    }
  })

  console.log(resultado);
}

// actualizarCursoOtroUpdate("613257b010bded06d4546f47");

async function actualizarCursoOtroUpdate2(id){
  const resultado = await Curso.findByIdAndUpdate(id, {
    $set: {
      autor: 'Gustavo Coronel',
      publicado: false
    }
  }, {new: true})

  console.log(resultado);
}

//actualizarCursoOtroUpdate2("61325823ff3d17647e175c7b");


async function eliminarDocumento(id){
  const result = await Curso.deleteOne({ _id: id })
  const resultado = await Curso.findByIdAndDelete(id); // si quiero eliminar el doc que se eliminó
  console.log(result);
}

eliminarDocumento('61325823ff3d17647e175c7b')


