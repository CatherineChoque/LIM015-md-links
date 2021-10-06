#!/usr/bin/env node
const apiRuta = require('../src/api.js');
const chalk = require('chalk');

// -------- pruebas de ejemplo ---------
const rutaValida = 'D:/LABORATORIA2021/LIM015-md-links/example';
const rutaNoValida = 'D:/LABORATORIA2021/LIM015-md-links/exam';
const noHayArchivosMd = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\carpetaVasia';
const archivoMdSinLinks = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\sinLinks.md';
const archivoMdConLink = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md';

// --------- funcion mdlinks ---------
const mdlinks = (ruta, option) => {
  return new Promise( (resolve, reject) => {
    if(apiRuta.rutaExiste(ruta)){
      const rutaAbsoluta = apiRuta.rutaAbsoluta(ruta); // ruta relativa a absoluta
      const buscaArchivos = apiRuta.encontrarArchivosMd(rutaAbsoluta); // array de archivos .md
      if(buscaArchivos.length > 0){ // si hay archivos .md
        const leeLinks = apiRuta.leeEnlacesMd(rutaAbsoluta); // href, text y ruta
        if(leeLinks.length > 0){
          if(option.validate === true){
            const buscaCadaArchivoLinks = leeLinks.map((objeto) => {
              const estadosLinks = apiRuta.validarConAxios(objeto);
              return estadosLinks;
            });
            resolve(Promise.all(buscaCadaArchivoLinks));
          }else{
            resolve(leeLinks);
          }
        }else{
          reject('no hay links')
        }
      } else {
        reject('no hay archivos .md')
      }
    }else{
      reject('la ruta no es valida o no existe');
    }
  });
};
/*
mdlinks(archivoMdConLink, {validate: true})
.then( res => {
  console.log(res);
})
.catch(reject => {
  console.log(reject);
})  
*/

// --------- CLI ---------
/* Retorna un arr con los args pasados en la linea de comandos,
 1ero es el ejecutable node -> md-links [0]
 2do la ruta del ejecutable -> 'D:/LABORATORIA2021/LIM015-md-links/example' [1]
 3ero los argumentos que el usuario le pase a mi fn -> --stats o --validate [2]
*/
const argumento = process.argv.slice(2) // ['node', 'md-links', 'd:/ruta'] , llamamos la ruta
// Esta ignora la funcion en el test | istanbul ignore next
/* istanbul ignore next */
const cli = (argumento) => {
  if (argumento.length === 1) { // true - tamaño array 1 - 'd:/ruta'
//  mdlinks(    ruta    ,      options       )
    mdlinks(argumento[0], { validate: false }) // D:/LABORATORIA2021/LIM015-md-links/example | D:/LABORATORIA2021/LIM015-md-links/example/new/ejemplo/modelo.md
    .then(resolve => {
      resolve.map((objeto) => {
      console.log(`${chalk.yellow(objeto.href)} | ${chalk.cyan(objeto.text)} | ${chalk.green(objeto.ruta)}`); // concatena y me regresa un string
      })
    })
    .catch(reject => console.log(reject));
  }

  if (argumento.length === 2) { // true - tamaño array 2 - 'd:/ruta' '--validate'
    switch (argumento[1]) { // --validate
    case '--validate':
      mdlinks(argumento[0], { validate: true })
      .then(resolve => {
        resolve.map((objeto) => {
        console.log(`${chalk.green(objeto.ruta)} | ${chalk.yellow(objeto.href)} | ${chalk.blue(objeto.menssage)} | ${chalk.magenta(objeto.status)} | ${chalk.cyan(objeto.text)}`);
        })
      })
      .catch(reject => console.log(reject));
      break;
  
    case '--stats':
      mdlinks(argumento[0], { validate: true })
        .then(resolve => 
        console.log(`${chalk.cyan(apiRuta.totalEnlaces(resolve))} ${chalk.magenta(apiRuta.enlacesUnicos(resolve))}`)
        )
        .catch(reject => console.log(reject));
      break;
  
    case '--help':
      console.log(`Intente escribir después de la ruta: --stats, --validate o ambos`);
      break;

    default: console.log('Comando no válido. Si necesita ayuda ingrese --help');
      break;
    }
  }

  if (argumento.length === 3) { // true - tamaño array 3 - 'd:/ruta' '--validate' '--stats'
    if ((argumento[1] === "--stats" && argumento[2] === "--validate") || (argumento[1] === "--validate" && argumento[2] === "--stats")) {
      mdlinks(argumento[0], { validate: true })
        .then(resolve => 
        console.log(`${chalk.cyan(apiRuta.totalEnlaces(resolve))} ${chalk.magenta(apiRuta.enlacesUnicos(resolve))} ${chalk.yellow(apiRuta.enlacesRotos(resolve))}`)
        )
        .catch(reject => console.log(reject));
    } else {
      console.log('Comando no válido. Necesita ayuda ingrese --help.');
    }
  }
};
cli(argumento); // D:/LABORATORIA2021/LIM015-md-links/example

module.exports = {
  mdlinks,
};
