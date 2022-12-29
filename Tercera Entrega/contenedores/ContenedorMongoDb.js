import mongoose from 'mongoose'
import config from '../config.js'
import { v4 as uuidv4 } from 'uuid';

mongoose.connect(config.mongoDB.URI)

export default class ContenedorMongoDB {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema)
    }
  
    async save (newProducto){

        try {
            const objeto = {...newProducto}
            const contenido = await this.getAll()
            objeto['_id'] = uuidv4();
            objeto['Timestamp'] = Date.now()
            await this.collection.create(objeto)
            return (`Se agrego exitosamente el producto`)  
                    
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
            }
     }

    async createCarrito (){

        try {
            const objeto = {}
            const contenido = await this.getAll()
            objeto['_id'] = uuidv4();
            objeto['Timestamp'] = Date.now()
            objeto['productos'] = []
            await this.collection.create(objeto)
            return (`Se creo exitosamente el carrito`)
                       
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo crear el carrito:', error);
            }
    }

    async saveProducto (carritoId, newProducto){

        try {
            const objeto = {...newProducto}
            objeto['timestamp'] = Date.now()
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === carritoId)
            if (indexId+1){                                
                const Carrito = await this.getById(carritoId);
                Carrito.productos.push(objeto)
                await this.collection.findOneAndUpdate({_id:carritoId},{productos:Carrito.productos})
                return (`Se agrego exitosamente producto al carrito con Id: ${carritoId}`)
            }
            else{
                return ({error: 'carrito no encontrado'});
            }
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar producto', error);
            }
    }

    
    async getById (numberId) {

        try {                
            const contenido = await this.collection.find({_id:numberId})
            const indexId = contenido.findIndex(item => item._id === numberId)
            if (indexId+1){
                return (contenido[indexId])
            }
            else{
                return ({error: 'Id no encontrado'});
            }
        }
           catch (error) {
               console.log('😱😱😱 Ocurrion un error durante la operación get by Id', error);
           }
    }

    async getAll(){
        try {                      
            const contenido = await this.collection.find({})            
            return contenido
        }
            catch (error) {
           console.log('😱😱😱 Ocurrion un error durante la operación get all', error);
            }
    }

    async getAllCarrito(carritoId){
        try {                
            const Carrito = await this.getById(carritoId)
            if (Carrito['_id']> 0){
                if (Carrito.productos == undefined || Carrito.productos.length === 0){
                    return ({error: 'carrito no tiene productos'});
                }
                else {
                    return (Carrito.productos)
                }
            }          
            else {
                return (Carrito)
            }
           }
           catch (error) {
               console.log('😱😱😱 Ocurrion un error durante la operación get All', error);
           }
    }

    async deleteById(numberId){
        try{
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === numberId)
            if (indexId+1){
                await this.collection.deleteOne({_id: numberId})
                return (`Se borro exitosamente el producto con Id: ${numberId}`);
            }
            else{
                return ({error: 'producto no encontrado'});
            }
        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete by Id', error);
            }
    }

    async deleteByIdCarrito(carritoId,productoId){
        try{
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === carritoId)
            if (indexId+1){
                const Carrito = await this.getById(carritoId);         
                const indexDelete = Carrito.productos.findIndex(item => item._id === productoId)
                if (indexDelete+1){
                    Carrito.productos.splice(indexDelete,1)
                    await this.collection.findOneAndUpdate({_id:carritoId},{productos:Carrito.productos})
                    return (`Se borro exitosamente el producto con Id: ${productoId}`);
                }
                else{
                    return ({error: 'producto en carrito no encontrado'});
                }
            }
            else{
                return ({error: 'carrito no encontrado'});
            }
        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete by Id', error);
            }
    }

    async deleteAll(){
        try{
            await this.collection.deleteMany({})
            return (`Se borrarron exitosamente todos los productos `)

        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);

            }
    }

    async deleteAllCarrito(carritoId){
        try{
            const contenido = await this.getAll()
            const carritoDelete = contenido.findIndex(item => item._id === carritoId)
            if (carritoDelete+1){
                await this.collection.deleteOne({_id: carritoId})
                return (`Se borro exitosamente el carrito con Id:${carritoId}`)
            }
            else{
                return ({error: 'carrito no encontrado'});
            }

        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);
            }
    }

    async updateById(data,numberId){
        try{
            const objeto = {...data}
            objeto['_id']= numberId
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === numberId)            
            if (indexId+1){
                await this.collection.updateOne({_id:numberId},{$set: objeto});
                return ({Actualizado_id: numberId });
            }
            else{
                return ({error: 'producto no encontrado'});
            }
        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);
            }
    }

}

