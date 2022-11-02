import express from 'express'
import useragent from 'express-useragent'
import path from 'path'
import { fileURLToPath } from 'url';


import productos from './router/productos.js'
import carrito from './router/carrito.js'

const app = express()

const PORT = process.env.NODE_PORT || 8080
const ENV = process.env.NODE_ENV || 'local'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(useragent.express())

app.use('/api/productos', productos)
app.use('/api/carrito', carrito)
app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({ error: -2, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
});


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))