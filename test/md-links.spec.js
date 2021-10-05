const api = require('../src/api.js');
const index = require('../src/index.js');

const rutaRelativaEjemplo = 'example/README.md';
const rutaAbsolutaEjemplo = 'D:/LABORATORIA2021/LIM015-md-links/example/todolist.txt';
const rutaDirectorioEjemplo = 'D:\\LABORATORIA2021\\LIM015-md-links\\example';
const rutaArchivoMdEjemplo = 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\prueba.md';

describe('API', () => {
  // funcion que convierte una ruta relativa a absoluta
  it('Retorna function para la funcion rutaAbsoluta',() => {
    expect(typeof api.rutaAbsoluta).toBe('function');
  });
  it('Retorna la ruta absoluta', () => {
    expect(api.rutaAbsoluta(rutaRelativaEjemplo)).toBe('D:\\LABORATORIA2021\\LIM015-md-links\\example\\README.md');
  });
  it('Retorna la ruta absoluta', () => {
    expect(api.rutaAbsoluta(rutaDirectorioEjemplo)).toBe('D:\\LABORATORIA2021\\LIM015-md-links\\example');
  });

  // funcion existe(valida) la ruta
  it('Retorna function para la funcion rutaExiste',() => {
    expect(typeof api.rutaExiste).toBe('function');
  });
  it('Retorna true si la ruta existe', () => {
    expect(api.rutaExiste(rutaRelativaEjemplo)).toBe(true);
  });

  // funcion si es un archivo
  it('Retorna function para la funcion esArchivo',() => {
    expect(typeof api.esArchivo).toBe('function');
  });
  it('Retorna true si es un archivo', () => {
    expect(api.esArchivo(rutaAbsolutaEjemplo)).toBe(true);
  });

  // funcion si es un directorio
  it('Retorna function para la funcion esDirectorio',() => {
    expect(typeof api.esDirectorio).toBe('function');
  });
  it('Retorna true si es un directorio', () => {
    expect(api.esDirectorio(rutaDirectorioEjemplo)).toBe(true);
  });

  // funcion si es un archivo .md
  it('Retorna function para la funcion esArchivoMd',() => {
    expect(typeof api.esArchivoMd).toBe('function');
  });
  it('Retorna true si es un archivo .md', () => {
    expect(api.esArchivoMd(rutaRelativaEjemplo)).toBe(true);
  });

  // funcion lee el directorio
  it('Retorna function para la funcion leeDirectorio',() => {
    expect(typeof api.leeDirectorio).toBe('function');
  });
  it('Lee contenido de la carpeta y lo devuelve en un array', () => {
    expect(typeof api.leeDirectorio(rutaDirectorioEjemplo)).toBe('object');
  });

  // funcion lee el archivo
  it('Retorna function para la funcion leeArchivo', () => {
    expect(typeof api.leeArchivo).toBe('function');
  });
  it('Lee contenido de la carpeta y lo devuelve en un string', () => {
    expect(typeof api.leeArchivo(rutaArchivoMdEjemplo)).toBe('string');
  });

  // funcion encontrar archivos .md
  it('Retorna function para la funcion encontrarArchivosMd', () => {
    expect(typeof api.encontrarArchivosMd).toBe('function');
  });
  it('Encuentra archivos .md y lo devuelve en un array', () => {
    expect(typeof api.encontrarArchivosMd(rutaDirectorioEjemplo)).toBe('object');
  });

  // funcion lee los enlaces del archivo .md
  it('Retorna function para la funcion leeEnlacesMd', () => {
    expect(typeof api.leeEnlacesMd).toBe('function');
  });
  it('Lee archivos .md y lo devuelve en un array de objetos', () => {
    expect(typeof api.leeEnlacesMd(rutaArchivoMdEjemplo)).toBe('object');
  });

  // funcion validar enlaces de archivos .md
  it('Retorna function para la funcion validarConAxios', () => {
    expect(typeof api.validarConAxios).toBe('function');
  });
  it('Lee los link de los archivos .md y lo devuelve en un array de objetos', () => {
    expect(typeof api.validarConAxios(rutaDirectorioEjemplo)).toBe('object');
  });
  /*
  it('Valida los links OK extraidos', () => {
      const objetoTresEstadosOk = {
        href: 'https://www.google.com/',
        text: 'Adios',
        ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
      };

      const retornaEnlaceOk = {
        href: 'https://www.google.com/',
        text: 'Adios',
        ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\modelo.md',
        status: 200,
        menssage: 'OK'
      };
      return api.validarConAxios(objetoTresEstadosOk)
      .then((res) => {expect(res).toEqual(retornaEnlaceOk)});
    });
  it('Valida los links FAIL extraidos', () => {
      const objetoTresEstadosFail = {
        href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
        text: 'hola',
        ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md',
      };
      
      const retornaEnlaceFail = {
          href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
          text: 'hola',
          ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md',
          status: 503,
          menssage: 'Fail'
        };
      return api.validarConAxios(objetoTresEstadosFail)
      .then((res) => {expect(res).toEqual(retornaEnlaceFail)});
    });*/

});


describe('mdlinks', () => {
  // Funcion que devuelve los estados de los link
  it('Retorna function para la funcion mdlinks',() => {
    expect(typeof index.mdlinks).toBe('function');
  });

  // Ingresando con options === true
  it('options === true', () => {
    const retornaCincoEstados = [
        {
          href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
          text: 'hola',
          ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md',
          status: 404,
          menssage: 'Fail'
        }  
    ];
    return index.mdlinks('D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md', {validate: true} )
    .then((res) => {expect(res).toEqual(retornaCincoEstados)});
  });

  // Ingresando con options === false
  it('options === false', () => {
    const retornaTresEstados = [
      {
        href: 'https://www.instagram.com/p/CFS1ZQqn3Jd/0',
        text: 'hola',
        ruta: 'D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md'
      }
    ];
    return index.mdlinks('D:\\LABORATORIA2021\\LIM015-md-links\\example\\new\\ejemplo\\archivofail.md', {validate: false} )
    .then((res) => {expect(res).toEqual(retornaTresEstados)});
  });

  // Mensaje de error del catch de una ruta no valida
  it('una ruta no valida', () => {
    const rutaNoValida = 'la ruta no es valida o no existe';
    return index.mdlinks('D:/LABORATORIA2021/LIM015-md-links/exam', {validate: true} )
    .catch((error) => {expect(error).toEqual(rutaNoValida)});
  });
  
});



