import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

export default class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        console.log('ProductosDaoMongoDB Here')
        super('Producto', new Schema({  
          _id: { type: Number, require: true },        
          nombre: { type: String, require: true },
          descripcion : { type: String, require: true },
          codigo : { type: String, require: true },
          foto : { type: String, require: true },
          precio: { type: Number, require: true },
          stock : { type: Number, require: true },
          Timestamp: { type: String, required: true },
        }))
    }
}

