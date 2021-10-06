const path = require('path');
const fs = require('fs');
const marked = require('marked');
const axios = require('axios');

// ---------- pruebas de ejemplo ---------
const rutaAbsolutaEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example/todolist.txt';
const rutaDirectorioEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example';
const rutaRelativaEjemplo = 'example/README.md';
const objetoTresEstadosOk = {
  href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
  text: 'hola',
  ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md',
};
const objetoTresEstadosFail = {
  href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
  text: 'hola',
  ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md'
};
const arrayEnlaces = [
  {
    href: 'https://www.google.com/',
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 200,
    menssage: 'OK'
  },
  {
    href: 'https://www.google.com/',
    text: 'Otra cosa',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 200,
    menssage: 'OK'
  },
  {
    href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 404,
    menssage: 'FAIL'
  },
  {
    href: 'https://www.instagram.com/',
    text: 'Adios',
    ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
    status: 200,
    menssage: 'OK'
  },
];

// ---------- si es ruta relativa cambia a absoluta ----------
const rutaAbsoluta = (ruta) => path.isAbsolute(ruta) ? ruta : path.resolve(ruta);
//console.log('La ruta es absoluta: ---> ', rutaAbsoluta(rutaAbsolutaEjemplo), 9); // Ruta
//console.log('La ruta es absoluta: ---> ', rutaAbsoluta(rutaRelativaEjemplo), 10); // Ruta

// ----------- si la ruta existe ------------
const rutaExiste = (ruta) => fs.existsSync(ruta);
//console.log('La ruta existe: ---> ', rutaExiste(rutaAbsolutaEjemplo), 15); // true

// ---------- si es un archivo ----------
const esArchivo = (ruta) => fs.lstatSync(ruta).isFile();
// console.log('La ruta es un archivo: ---> ', esArchivo(rutaAbsolutaEjemplo), 19); // true

// ---------- si es una carpeta ----------
const esDirectorio = (ruta) => fs.lstatSync(ruta).isDirectory();
//console.log('La ruta es un directorio: ---> ', esDirectorio(rutaDirectorioEjemplo) , 23) // true

// ---------- si es un archivo ----------
const esArchivoMd = (ruta) => path.extname(ruta) === '.md';
//console.log('La ruta tiene de extencion .md: ---> ', esMd(rutaRelativaEjemplo)); // true

// ---------- lee la carpeta ----------
const leeDirectorio = (ruta) => fs.readdirSync(ruta);
// console.log('Contenido de la carpeta en un array ---> ', leeDirectorio(rutaDirectorioEjemplo)); // Array

// ---------- lee un archivo ----------
const leeArchivo = (ruta) => fs.readFileSync(ruta, 'utf-8');
// console.log('Contenido de la archivo ---> ', leeArchivo(rutaAbsolutaEjemplo)); // String

// ---------- funcion encuentra archivos .md ---------
const encontrarArchivosMd = (ruta) => {
  let arrayDeArchivos = [];
    if(esDirectorio(ruta)) {
    const directorioDeArchivos = leeDirectorio(ruta);
        directorioDeArchivos.forEach((elem) => {
        const rutaElem = elem;
        const nuevaRuta = path.join(ruta, rutaElem);
        const nuevoArraysDeArchivosMd = encontrarArchivosMd(nuevaRuta);
        arrayDeArchivos = arrayDeArchivos.concat(nuevoArraysDeArchivosMd);
        });
    }else if(esArchivoMd(ruta)){ // aqui se usa recursividad
        arrayDeArchivos.push(ruta);
    };
    return arrayDeArchivos;
};
// console.log('Las archivos .md en total: ', encontrarArchivosMd(rutaDirectorioEjemplo));

// ---------- funcion de leer link de archivos .md ---------
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
// console.log(leeEnlacesMd(rutaRelativaEjemplo));
/* eslint-disable */
// ---------- Funcion para el validar enlaces de archivos .md ----------
const validarConAxios = (objeto) => {
  return axios(objeto.href)
      .then((data) => {
        if (data.status >= 200 && data.status < 400) {
          return {
            ...objeto, 
            status: data.status,
            menssage: 'OK'
          };
        }      
      })
      .catch((err) => {
        return ({
          ...objeto,
          status: err.response.status,
          menssage: 'Fail'
        })
      });
};
//  validarConAxios(objetoTresEstadosFail).then(response => (console.log(response)));
//  console.log(err.response.status , 139);

// --------- Función links unicos ---------
const enlacesUnicos = (objeto) => {
  const unico = new Set(objeto.map(elem => elem.href)); // array
  const enlacesunicos = `\nUnicos: ${unico.size}`;
  return enlacesunicos;
};
// console.log(enlacesUnicos(arrayEnlaces));

// --------- Función links rotos ---------
const enlacesRotos = (objeto) => {
  const roto = objeto.filter((elem) => elem.status >= 400) // array de objetos
  const enlacesRotos = `\nRotos: ${roto.length}`;
  return enlacesRotos;
};
// console.log(enlacesRotos(arrayEnlaces));

// --------- Función links totales ----------
const totalEnlaces = (objeto) => {
  const total = objeto.map(link => link.href); // array de enlaces
  const totalEnlaces = `\nTotal: ${total.length}`;
  return totalEnlaces;
};
// console.log(totalEnlaces(arrayEnlaces));

module.exports = {
  rutaAbsoluta,
  rutaExiste,
  esArchivo,
  esDirectorio,
  esArchivoMd,
  leeDirectorio,
  leeArchivo,
  encontrarArchivosMd,
  leeEnlacesMd,
  validarConAxios,
  enlacesUnicos,
  enlacesRotos,
  totalEnlaces,
};
