// Modulo Path

const path = require('path')

const objPath = path.parse(__filename)

console.log(objPath)
console.log(objPath.base)