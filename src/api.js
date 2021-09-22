const path = require('path');
const fs = require('fs');

const rutaAbsolutaExample = 'D:/LABORATORIA2021/LIM015-md-links/example/todolist.txt';
const rutaDirectorioExample = 'D:/LABORATORIA2021/LIM015-md-links/example';
const rutaRelativaExample = 'example/README.md';

// si es ruta relativa cambia a absoluta
const rutaAbsoluta = (file) => path.isAbsolute(file) ? file : path.resolve(file);
console.log(rutaAbsoluta(rutaAbsolutaExample), 9);
console.log(rutaAbsoluta(rutaRelativaExample), 10);

//si la ruta existe
const rutaExiste = (ruta) => fs.existsSync(ruta);
console.log(rutaExiste(rutaAbsolutaExample), 14);

// estado de la ruta
// const quepasa = fs.statSync(rutaAbsolutaExample)
// console.log(quepasa, 13);

// si es un archivo - file
const esArchivo = (ruta) => fs.lstatSync(ruta).isFile();

console.log(fs.lstatSync(rutaAbsolutaExample).isFile() , 22) // true
console.log(fs.lstatSync(rutaDirectorioExample).isFile() , 23) //false

// si es una carpeta - directorio
console.log(fs.lstatSync(rutaAbsolutaExample).isDirectory() , 25) // false
console.log(fs.lstatSync(rutaDirectorioExample).isDirectory() , 26) // true

// si es un documento .md
