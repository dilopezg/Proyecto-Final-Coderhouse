import cpu from "os";
import minimist from "minimist";

const numCPUs = cpu.cpus().length;
const arg = minimist(process.argv.slice(2));
let rapsheet =
  `<h1 style="background-color:#009ed2;">Ruta de Informacion </h1>\n` +
  `<div ><p > <strong>Argumentos de entrada : </strong>  ${JSON.stringify(
    arg
  )}</p></div>\n` +
  `<div ><p > <strong>Nombre de la plataforma (sistema operativo) : </strong>  ${process.platform}</p></div>\n` +
  `<div ><p > <strong>Versión de node.js : </strong>  ${process.version}</p></div>\n` +
  `<div ><p > <strong>Memoria total reservada (rss) : </strong>  ${
    process.memoryUsage().rss
  }</p></div>\n` +
  `<div ><p > <strong>Path de ejecución : </strong>  ${process.cwd()}</p></div>\n` +
  `<div ><p > <strong>Process id : </strong>  ${process.pid}</p></div>\n` +
  `<div ><p > <strong>Carpeta del proyecto : </strong>  ${process.execPath}</p></div>\n` +
  `<div ><p > <strong>Numero de procesadores : </strong>  ${numCPUs}</p></div>\n`;

export default rapsheet;
