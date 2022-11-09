import express from 'express';
import path from 'path';
import { Router } from 'express';
const router = Router(Router)

import {carritosDao} from '../daos/index.js';


router.post('/', async(_, res) => {
  res.status(200).json(await carritosDao.createCarrito())
})

router.get('/:id/productos', async(req, res) => {
    const carritoId= req.params.id
    res.status(200).json(await carritosDao.getAllCarrito(carritoId))
})

router.post('/:id/productos', async(req, res) => {
  let { body : data } = req
  const numberId = req.params.id
  res.status(200).json(await carritosDao.saveProducto(numberId,data));
})

router.delete('/:id', async(req, res) => {
    const numberId = req.params.id
    res.status(200).json(await carritosDao.deleteAllCarrito(numberId)); 
  })

router.delete('/:id/productos/:id_prod', async(req, res) => {
  const carritoId= req.params.id
  const productoId = req.params.id_prod
  res.status(200).json(await carritosDao.deleteByIdCarrito(carritoId,productoId)); 
})

export default router