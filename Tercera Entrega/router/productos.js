import express from 'express';
import path from 'path';
import { Router } from 'express';
const router = Router(Router)

import {productosDao} from '../daos/index.js';

const administrador = true;

router.post('/', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  let { body : data } = req
  if (administrador){
    res.status(200).json(await productosDao.save(data))
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

router.get('/:id?', async(req, res) => {  
  const numberId = req.params.id
  if (numberId == ':id'){
    res.status(200).json(await productosDao.getAll());
  }
  else{
    res.status(200).json(await productosDao.getById(numberId));
  }
})

router.put('/:id', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  let { body : data } = req
  const numberId = req.params.id
  if (administrador){
    res.status(200).json(await productosDao.updateById(data,numberId));
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

router.delete('/:id', async(req, res) => {
  const path = req.originalUrl
	const method = req.method;
  const numberId = req.params.id
  if (administrador){
    res.status(200).json(await productosDao.deleteById(numberId)); 
  }
  else{
    res.send({ error: -1, descripcion: `ruta '${path}' método '${method}' no autorizada` });
  }
})

export default router