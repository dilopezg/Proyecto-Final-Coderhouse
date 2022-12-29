import fs from 'fs'
import config from '../config.js'
import { v4 as uuidv4 } from 'uuid';
  
export default class ContenedorArchivo{
    
    constructor(ruta){
        this.ruta = `${config.fileSystem.path}/${ruta}`
    }

    async leerArchivo (ruta){
        try {
            const data = await fs.promises.readFile(ruta, 'utf-8')
        return JSON.parse(data)
      } 
        catch (error) {
        return []
        }
    }

    async escribirArchivo (ruta, contenido){
        try {
            await fs.promises.writeFile(ruta, contenido, 'utf-8')
        } 
            catch (error) {
            console.log('😱 Ocurrio un error durante la escritura:', error);
            throw new Error(error.message)
            }
    }
    

    async save (newProducto){

        try {
            const objeto = {...newProducto}
            const contenidoJSON = await this.leerArchivo(this.ruta)
            objeto['Id'] = uuidv4();
            objeto['Timestamp'] = Date.now()
            contenidoJSON.push(objeto)
            await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
            return (`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)            
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
            }
     }

    async createCarrito (){

        try {
            const objeto = {}
            const contenidoJSON = await this.leerArchivo(this.ruta)
            objeto['Id'] = uuidv4();
            objeto['Timestamp'] = Date.now()
            objeto['Productos'] = []
            contenidoJSON.push(objeto)
            await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
            return (`Se creo exitosamente el carrito con Id: ${objeto['Id']}`)            
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo crear el carrito:', error);
            }
    }

    async saveProducto (carritoId, newProducto){

        try {
            const objeto = {...newProducto}
            objeto['timestamp'] = Date.now()
            const contenidoJSON = await this.leerArchivo(this.ruta)
            const indexId = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (indexId+1){                
                const Carrito = await this.getById(carritoId);
                Carrito.Productos.push(objeto)             
                contenidoJSON[indexId] = Carrito
                await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
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
            const contenidoJSON = await this.leerArchivo(this.ruta) 
            const indexId = contenidoJSON.findIndex(item => item.Id === numberId)
            if (indexId+1){
                return (contenidoJSON[indexId])
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
            const contenidoJSON = await this.leerArchivo(this.ruta)            
            return contenidoJSON
        }
            catch (error) {
           console.log('😱😱😱 Ocurrion un error durante la operación get all', error);
            }
    }

    async getAllCarrito(carritoId){
        try {                
            const Carrito = await this.getById(carritoId)
            if (Carrito['Id']> 0){
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
            const contenidoJSON = await this.leerArchivo(this.ruta)
            const indexDelete = contenidoJSON.findIndex(item => item.Id === numberId)
            if (indexDelete+1){
                contenidoJSON.splice(indexDelete,1)
                await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
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
            const contenidoJSON = await this.leerArchivo(this.ruta)
            const indexId = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (indexId+1){
                const Carrito = await this.getById(carritoId);         
                const indexDelete = Carrito.Productos.findIndex(item => item.Id === productoId)
                console.log(indexDelete);
                if (indexDelete+1){
                    Carrito.Productos.splice(indexDelete,1)
                    contenidoJSON[indexId] = Carrito
                    await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
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
            await this.escribirArchivo(this.ruta, JSON.stringify([], null, 2))
            return (`Se borrarron exitosamente todos los productos `)

        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);

            }
    }

    async deleteAllCarrito(carritoId){
        try{
            const contenidoJSON = await this.leerArchivo(this.ruta)
            const carritoDelete = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (carritoDelete+1){
                contenidoJSON.splice(carritoDelete,1);
                await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
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
            objeto['Id']= numberId
            const contenidoJSON = await this.leerArchivo(this.ruta)
            const indexId = contenidoJSON.findIndex(item => item.Id === numberId)
            if (indexId+1){
                contenidoJSON[indexId] = objeto
                await this.escribirArchivo(this.ruta, JSON.stringify(contenidoJSON, null, 2))
                return ({Actualizado_Id: numberId });
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

