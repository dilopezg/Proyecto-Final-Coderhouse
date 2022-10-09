const express = require('express')
const useragent = require('express-useragent')
const path = require('path')


const productos = require('./router/productos')
const carrito = require('./router/carrito')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

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