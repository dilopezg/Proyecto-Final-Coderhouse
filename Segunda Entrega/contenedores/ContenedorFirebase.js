import firebase from 'firebase-admin'; 
import config from '../config.js'

firebase.initializeApp({credential: firebase.credential.cert(config.firebase)});



export default class ContenedorFirebase {
    constructor(name) {
		this.db = firebase.firestore();
        this.query = this.db.collection(name)
    }
  
    async save (newProducto){

        try {
            const objeto = {...newProducto}
            const contenido = await this.getAll()
            const lengthIdList = contenido.map(item =>item._id).length
            if (lengthIdList === 0){
                const _id = 1
                objeto['_id'] = 1
                objeto['Timestamp'] = Date.now()
                const doc = this.query.doc(`${_id}`) 
                await doc.create(objeto)
                return (`Se agrego exitosamente el producto`)
            }
            else{
                const lastId = contenido[lengthIdList-1]._id
                objeto['_id'] = lastId + 1
                const _id = lastId + 1
                objeto['Timestamp'] = Date.now()
                const doc = this.query.doc(`${_id}`) 
                await doc.create(objeto)
                return (`Se agrego exitosamente el producto`)
            }            
        }
            catch (error) {
            console.log('😱😱😱 Ocurrion un error durante la operación y no se pudo agregar el producto:', error);
            }
     }

    async createCarrito (){

        try {
            const objeto = {}
            const contenido = await this.getAll()
            const lengthIdList = contenido.map(item =>item._id).length
            if (lengthIdList === 0){
                const _id = 1
                objeto['_id'] = 1
                objeto['Timestamp'] = Date.now()
                objeto['productos'] = []
                const doc = this.query.doc(`${_id}`) 
                await doc.create(objeto)
                return (`Se creo exitosamente el carrito`)
            }
            else{
                const lastId = contenido[lengthIdList-1]._id
                const _id = lastId + 1
                objeto['_id'] = lastId + 1
                objeto['Timestamp'] = Date.now()
                objeto['productos'] = []
                const doc = this.query.doc(`${_id}`) 
                await doc.create(objeto)
                return (`Se creo exitosamente el carrito`)
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
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === Number(carritoId))
            if (indexId+1){                                
                const Carrito = await this.getById(carritoId);
                Carrito.productos.push(objeto)
                const doc = this.query.doc(`${carritoId}`) 
                await doc.update(Carrito)
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
            const snapshot = await this.query.where('_id', '==', Number(numberId)).get()
            if (!snapshot.empty){
                return (snapshot.docs[0].data())
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
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            const contenido = docs.map(doc => ({ _id: doc._id, ...doc.data() }))         
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
            const indexId = contenido.findIndex(item => item._id === Number(numberId))
            if (indexId+1){
                const snapshot = await this.query.where('_id', '==', Number(numberId)).get()
                const doc = this.query.doc(snapshot.docs[0].id)
                await doc.delete()
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
            const indexId = contenido.findIndex(item => item._id === Number(carritoId))
            if (indexId+1){
                const Carrito = await this.getById(carritoId);         
                const indexDelete = Carrito.productos.findIndex(item => item._id === Number(productoId))
                if (indexDelete+1){
                    Carrito.productos.splice(indexDelete,1)
                    const doc = this.query.doc(`${carritoId}`) 
                    await doc.update(Carrito)
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
            const doc = this.query.doc()
            await doc.delete()
            return (`Se borrarron exitosamente todos los productos `)

        }        
            catch (error) {
                console.log('😱😱😱 Ocurrion un error durante la operación delete all', error);

            }
    }

    async deleteAllCarrito(carritoId){
        try{
            const contenido = await this.getAll()
            const carritoDelete = contenido.findIndex(item => item._id === Number(carritoId))
            if (carritoDelete+1){
                const doc = this.query.doc(`${carritoId}`) 
                await doc.delete()
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
            objeto['_id']= Number(numberId)
            const contenido = await this.getAll()
            const indexId = contenido.findIndex(item => item._id === Number(numberId))
            if (indexId+1){
                const doc = this.query.doc(`${numberId}`) 
                await doc.update(objeto)
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

