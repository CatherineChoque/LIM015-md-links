const api = require('../src/api.js');

const rutaRelativaEjemplo = 'example/README.md';
const rutaAbsolutaEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example/todolist.txt';
const rutaDirectorioEjemplo = 'D:\\LABORATORIA2021\\LIM015-md-links\\example';
const rutaArchivoMdEjemplo = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\prueba.md';

describe('API', () => {
  // funcion que convierte una ruta relativa a absoluta
  it('Retorna function ',() => {
    expect(typeof api.rutaAbsoluta).toBe('function');
  });
  it('Retorna la ruta absoluta', () => {
    expect(api.rutaAbsoluta(rutaRelativaEjemplo)).toBe('D:\\LABORATORIA2021\\LIM015-md-links\\example\\README.md');
  });
  it('Retorna la ruta absoluta', () => {
    expect(api.rutaAbsoluta(rutaDirectorioEjemplo)).toBe('D:\\LABORATORIA2021\\LIM015-md-links\\example');
  });

  // funcion existe(valida) la ruta
  it('Retorna function ',() => {
    expect(typeof api.rutaExiste).toBe('function');
  });
  it('Retorna true si la ruta existe', () => {
    expect(api.rutaExiste(rutaRelativaEjemplo)).toBe(true);
  });

  // funcion si es un archivo
  it('Retorna function ',() => {
    expect(typeof api.esArchivo).toBe('function');
  });
  it('Retorna true si es un archivo', () => {
    expect(api.esArchivo(rutaAbsolutaEjemplo)).toBe(true);
  });

  // funcion si es un directorio
  it('Retorna function ',() => {
    expect(typeof api.esDirectorio).toBe('function');
  });
  it('Retorna true si es un directorio', () => {
    expect(api.esDirectorio(rutaDirectorioEjemplo)).toBe(true);
  });

  // funcion si es un archivo .md
  it('Retorna function ',() => {
    expect(typeof api.esMd).toBe('function');
  });
  it('Retorna true si es un archivo .md', () => {
    expect(api.esMd(rutaRelativaEjemplo)).toBe(true);
  });

  // funcion lee el directorio
  it('Retorna function ',() => {
    expect(typeof api.leeDirectorio).toBe('function');
  });
  it('Lee contenido de la carpeta y lo devuelve en un array', () => {
    expect(typeof api.leeDirectorio(rutaDirectorioEjemplo)).toBe('object');
  });

  // funcion lee el archivo
  it('Retorna function', () => {
    expect(typeof api.leeArchivo).toBe('function');
  });
  it('Lee contenido de la carpeta y lo devuelve en un string', () => {
    expect(typeof api.leeArchivo(rutaArchivoMdEjemplo)).toBe('string');
  });

  // funcion encontrar archivos .md
  it('Retorna function', () => {
    expect(typeof api.encontrarArchivosMd).toBe('function');
  });
  it('Encuentra archivos .md y lo devuelve en un array', () => {
    expect(typeof api.encontrarArchivosMd(rutaDirectorioEjemplo)).toBe('object');
  });

  // funcion lee los enlaces del archivo .md
  it('Retorna function', () => {
    expect(typeof api.leeEnlacesMd).toBe('function');
  });
  it('Lee archivos .md y lo devuelve en un array de objetos', () => {
    expect(typeof api.leeEnlacesMd(rutaArchivoMdEjemplo)).toBe('object');
  });

});

// __tests__/index.test.js
/*
describe('initial', () => {
  test('first tests', () => {
    expect(true).toBe(true)
  })
})*/

