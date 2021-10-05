module.exports = () => {
  // ...
};

const apiRuta = require('../src/api.js');

const rutaValida = 'D:/LABORATORIA2021/LIM015-md-links/example';
const rutaNoValida = 'D:/LABORATORIA2021/LIM015-md-links/exam';
const noHayArchivosMd = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\carpetaVasia';
const archivoMdSinLinks = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\sinLinks.md';
const archivoMdConLink = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md';

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

mdlinks(rutaValida, {validate: true})
.then( res => {
  console.log(res);
})
.catch( error => {
  console.log('ERROR: ' + error);
})

module.exports = {
  mdlinks,
};

