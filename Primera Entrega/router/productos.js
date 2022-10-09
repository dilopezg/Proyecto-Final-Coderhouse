const express = require('express');
const path = require('path');
const { Router } = express
const router = Router(Router)
const Productos = require('../controllers/class_productos');
const productos = new Productos('./db/productos.txt');
const administrador = true;

router.post('/', async(req, res) => {
  let { body : data } = req
  res.status(200).json(await productos.save(data))
})

router.get('/:id?', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  const numberId = Number(req.params.id)
  if (administrador){
    if (isNaN(numberId)){
      res.status(200).json(await productos.getAll());
    }
    else{
      res.status(200).json(await productos.getById(numberId));
    }
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

router.put('/:id', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  let { body : data } = req
  const numberId = Number(req.params.id)
  if (administrador){
    res.status(200).json(await productos.updateById(data,numberId));
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

router.delete('/:id', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  const numberId = Number(req.params.id)
  if (administrador){
    res.status(200).json(await productos.deleteById(numberId)); 
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

module.exports = router