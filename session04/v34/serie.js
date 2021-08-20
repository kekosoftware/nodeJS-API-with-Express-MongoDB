//  Serie Fibonacci
// 1  1 2 3 5 8 13 21 34 ...

const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const { resourceUsage } = require('process')

let crearSerie = (cantidad) => {
  return new Promise((resolve, rejects) => {
    let fibo1 = 1
    let fibo2 = 1
    let serie = ''
    
    serie += `${fibo1}\t`
    
    for (let i = 2; i <= cantidad; i++){
      serie += `${fibo2}\t`
      fibo2 = fibo1 + fibo2
      fibo1 = fibo2 - fibo1
    }
    
    fs.writeFile('fibonacci.txt', serie, (err) => {
      if (err) 
        rejects("Error al crear el archvio")
      else
        resolve('The file has been saved!')
    })
  })
}

module.exports = {
  crearSerie
}