# Markdown Links

MDLINKS es una librería que permite leer y analizar archivos en formato markdown para verificar los links que contengan y reportar algunas estadísticas.

### Instalación

$ npm install catherine-choque-md-links

### Uso para importar

```sh
const mdLinks = require("catherine-choque-md-links");
```
### Modo de uso
```sh
mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### CLI

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

![1](https://user-images.githubusercontent.com/85088235/136296033-e6155d86-c6c5-4a8f-adc6-8bab8b6d12c3.JPG)


### Options

`--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

![2](https://user-images.githubusercontent.com/85088235/136296092-a2e6d15f-ca0a-42e2-bcd8-ca421e50e4be.JPG)

`--stats`

![3](https://user-images.githubusercontent.com/85088235/136296126-34cfc6db-b309-4b0a-b107-a6040f81551c.JPG)

`--stats` y `--validate`

![4](https://user-images.githubusercontent.com/85088235/136296149-5daffbc5-3ccb-4bb8-91e4-e19521f0ffe0.JPG)

