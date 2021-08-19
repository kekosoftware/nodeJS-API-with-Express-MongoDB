//  Funcion Flecha

const years = [2010, 2011, 2013, 2014]

var edad5 = years.map(function(val){
  return 2021 - val;
});

console.log(edad5)

// functions with EMC6

let edad6 = years.map((val) =>{
  return 2021 - val;
})

console.log(edad6)

//  Reducido
let edad7 = years.map(val => (2021 - val))

console.log(edad7)