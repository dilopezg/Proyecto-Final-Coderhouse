import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

export default class CarritosDaoMongoDB extends ContenedorMongoDB {

  constructor() {
    super('Carrito', new Schema({
      _id: { type: String, require: true },
      Timestamp: { type: String, required: true },
      productos: { type: [], require: true },
    }))
  }
  
}

