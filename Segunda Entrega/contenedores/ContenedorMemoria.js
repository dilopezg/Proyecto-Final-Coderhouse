export default class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    async save (newProducto){

        try {
            const objeto = {...newProducto}
            const lengthIdList = this.elementos.map(item =>item.Id).length
            const lastId = this.elementos[lengthIdList-1].Id            

            if (lengthIdList === 0){
                objeto['Id'] = 1
                objeto['Timestamp'] = Date.now()
                this.elementos.push(objeto)
                return (`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
            }

            else{
                objeto['Id'] = lastId + 1
                objeto['Timestamp'] = Date.now()
                this.elementos.push(objeto)
                return (`Se agrego exitosamente el producto con Id: ${objeto['Id']}`)
            }
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
            }
     }

    async createCarrito (){

        try {
            const objeto = {}
            const lengthIdList = this.elementos.map(item =>item.Id).length
            const lastId = this.elementos[lengthIdList-1].Id
            if (lengthIdList === 0){
                objeto['Id'] = 1
                objeto['Timestamp'] = Date.now()
                objeto['Productos'] = []
                this.elementos.push(objeto)
                return (`Se creo exitosamente el carrito con Id: ${objeto['Id']}`)
            }
            else{
                objeto['Id'] = lastId + 1
                objeto['timestamp'] = Date.now()
                objeto['productos'] = []
                this.elementos.push(objeto)
                return (`Se creo exitosamente el carrito con Id: ${objeto['Id']}`)
            }
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo crear el carrito:', error);
            }
    }

    async saveProducto (carritoId, newProducto){

        try {
            const objeto = {...newProducto}
            objeto['timestamp'] = Date.now()
            const indexId = this.elementos.findIndex(item => item.Id === carritoId)
            if (indexId+1){                
                const Carrito = await this.getById(carritoId);
                Carrito.productos.push(objeto)
                this.elementos[indexId] = Carrito
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
            const indexId = this.elementos.findIndex(item => item.Id === numberId)
            if (indexId+1){
                return (this.elementos[indexId])
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
            return this.elementos
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
            const indexDelete = this.elementos.findIndex(item => item.Id === numberId)
            this.elementos.splice(indexDelete,1)
            return (`Se borro exitosamente el producto con Id: ${numberId}`);
        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete by Id', error);
            }
    }

    async deleteByIdCarrito(carritoId,productoId){
        try{
            const indexId = this.elementos.findIndex(item => item.Id === carritoId)
            if (indexId+1){
                const Carrito = await this.getById(carritoId);         
                const indexDelete = Carrito.productos.findIndex(item => item.Id === productoId)
                if (indexDelete+1){
                    Carrito.productos.splice(indexDelete,1)
                    this.elementos[indexId] = Carritoreturn (`Se borro exitosamente el producto con Id: ${productoId}`);
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
            this.elementos = []
            return (`Se borrarron exitosamente todos los productos`)

        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);

            }
    }

    async deleteAllCarrito(carritoId){
        try{
            const carritoDelete = this.elementos.findIndex(item => item.Id === carritoId)
            if (carritoDelete+1){
                this.elementos.splice(carritoDelete,1);
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
            const indexId = this.elementos.findIndex(item => item.Id === numberId)
            if (indexId+1){
                this.elementos[indexId] = objeto
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

