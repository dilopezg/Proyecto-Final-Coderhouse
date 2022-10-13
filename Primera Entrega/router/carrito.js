const express = require('express')
const { Router } = express
const router = Router(Router)

const Carrito = require('../controllers/class_carrito');
const carrito = new Carrito('./db/carrito.txt');


router.post('/', async(_, res) => {
  res.status(200).json(await carrito.save())
})

router.get('/:id/productos', async(req, res) => {
    const carritoId= Number(req.params.id)
    res.status(200).json(await carrito.getAll(carritoId))
})

router.post('/:id/productos', async(req, res) => {
  let { body : data } = req
  const numberId = Number(req.params.id)
  res.status(200).json(await carrito.saveProducto(numberId,data));
})

router.delete('/:id', async(req, res) => {
    const numberId = Number(req.params.id)
    res.status(200).json(await carrito.deleteAll(numberId)); 
  })

router.delete('/:id/productos/:id_prod', async(req, res) => {
  const carritoId= Number(req.params.id)
  const productoId = Number(req.params.id_prod)
  res.status(200).json(await carrito.deleteById(carritoId,productoId)); 
})

module.exports = router