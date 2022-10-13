const fs = require('fs')
  
class Carrito{
        
    constructor(archivo){
        this.archivo = archivo
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
    

    async save (){

        try {
            const objeto = {}
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const lengthIdList = contenidoJSON.map(item =>item.Id).length
            const lastId = contenidoJSON[lengthIdList-1].Id
            if (lengthIdList === 0){
                objeto['Id'] = 1
                objeto['Timestamp'] = Date.now()
                objeto['Productos'] = []
                contenidoJSON.push(objeto)
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
                return (`Se creo exitosamente el carrito con Id: ${objeto['Id']}`)
            }
            else{
                objeto['Id'] = lastId + 1
                objeto['timestamp'] = Date.now()
                objeto['productos'] = []
                contenidoJSON.push(objeto)
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
                return (`Se creo exitosamente el carrito con Id: ${objeto['Id']}`)
            }
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo crear el carrito:', error);
            }
     }

     async getAll(carritoId){
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
     
     async getById (numberId) {
         
         try {                
             const contenidoJSON = await this.leerArchivo(this.archivo)
             const Carrito = contenidoJSON.find(item => item.Id == numberId);             
             if (Carrito+1){
                 return (Carrito)
                }
                else{
                    return ({error: 'carrito no encontrado'});
                }
            }
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación get by Id', error);
            }
        }
        
    async saveProducto (carritoId, newProducto){

        try {
            const objeto = {...newProducto}
            objeto['timestamp'] = Date.now()
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const indexId = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (indexId+1){                
                const Carrito = await this.getById(carritoId);
                Carrito.productos.push(objeto)
                contenidoJSON[indexId] = Carrito
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
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

    async deleteById(carritoId,productoId){
        try{
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const indexId = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (indexId+1){
                const Carrito = await this.getById(carritoId);         
                const indexDelete = Carrito.productos.findIndex(item => item.Id === productoId)
                if (indexDelete+1){
                    Carrito.productos.splice(indexDelete,1)
                    contenidoJSON[indexId] = Carrito
                    await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
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

    async deleteAll(carritoId){
        try{
            const contenidoJSON = await this.leerArchivo(this.archivo)
            const carritoDelete = contenidoJSON.findIndex(item => item.Id === carritoId)
            if (carritoDelete+1){
                contenidoJSON.splice(carritoDelete,1);
                await this.escribirArchivo(this.archivo, JSON.stringify(contenidoJSON, null, 2))
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
    
}


module.exports = Carrito;
