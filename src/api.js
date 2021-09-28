const path = require('path');
const fs = require('fs');
const marked = require('marked');

const rutaAbsolutaEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example/todolist.txt';
const rutaDirectorioEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example';
const rutaRelativaEjemplo = 'example/README.md';

// si es ruta relativa cambia a absoluta
const rutaAbsoluta = (ruta) => path.isAbsolute(ruta) ? ruta : path.resolve(ruta);
//console.log('La ruta es absoluta: ---> ', rutaAbsoluta(rutaAbsolutaEjemplo), 9);
//console.log('La ruta es absoluta: ---> ', rutaAbsoluta(rutaRelativaEjemplo), 10);

//si la ruta existe
const rutaExiste = (ruta) => fs.existsSync(ruta);
//console.log('La ruta existe: ---> ', rutaExiste(rutaAbsolutaEjemplo), 15);

// si es un archivo - file
const esArchivo = (ruta) => fs.lstatSync(ruta).isFile();
// console.log('La ruta es un archivo: ---> ', esArchivo(rutaAbsolutaEjemplo), 19); // true

// si es una carpeta - directorio
const esDirectorio = (ruta) => fs.lstatSync(ruta).isDirectory();
//console.log('La ruta es un directorio: ---> ', esDirectorio(rutaDirectorioEjemplo) , 23) // true

// si es un archivo .md
const esMd = (ruta) => path.extname(ruta) === '.md';
//console.log('La ruta tiene de extencion .md: ---> ', esMd(rutaRelativaEjemplo));

// lee la carpeta - directorio
const leeDirectorio = (ruta) => fs.readdirSync(ruta);
console.log('Contenido de la carpeta en un array ---> ', leeDirectorio(rutaDirectorioEjemplo));

// lee un archivo - file
const leeArchivo = (ruta) => fs.readFileSync(ruta, 'utf-8');
 console.log('Contenido de la archivo ---> ', leeArchivo(rutaAbsolutaEjemplo));

// funcion encuentra archivos .md
// si es un directorio -> lee el contenido del directorio -> si el directorio tiene contenido -> recorre el directorio -> encuentra archivos .md -> lo guarda en un array
const arrayDeArchivos = [];
const encontrarArchivosMd = (ruta) => {
    if(esDirectorio(ruta)) {
    //console.log(ruta, '---> Es una carpeta');
    const directorioDeArchivos = leeDirectorio(ruta);
    //console.log('Los archivos de la carpeta ---> ', directorioDeArchivos, 87);
        directorioDeArchivos.forEach((elem) => {
        const rutaElem = elem;
        const nuevaRuta = path.join(ruta, rutaElem);
        encontrarArchivosMd(nuevaRuta);
        });
    }else if(esMd(ruta)){
        arrayDeArchivos.push(ruta);
    }
    return arrayDeArchivos;
};
// console.log('Las archivos .md en total: ', encontrarArchivosMd(rutaDirectorioEjemplo));

 
// funcion de leer link de archivos .md
const leeEnlacesMd = (archivo) => {
  const arrayDeEnlacesMd = [];
  const archivosMd = encontrarArchivosMd(archivo);
  archivosMd.forEach((ruta) => {
      const leeArchivosMd = leeArchivo(ruta);
      const renderer = new marked.Renderer();
      renderer.link = (url, texto, urlText) => {
        arrayDeEnlacesMd.push(
            {
                href: url,
                text: urlText.substring(0,20),
                ruta: ruta
              }
          );
      };
      marked(leeArchivosMd, {renderer});
  });
  return arrayDeEnlacesMd;
};
 console.log(leeEnlacesMd('D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\prueba.md'));


module.exports = {
  rutaAbsoluta,
  rutaExiste,
  esArchivo,
  esDirectorio,
  esMd,
  leeDirectorio,
  leeArchivo,
  encontrarArchivosMd,
  leeEnlacesMd,
};
