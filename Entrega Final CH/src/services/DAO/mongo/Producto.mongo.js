import "./db.config.js";
import { ProductoModel } from "../../../models/Productos.model.js";
import FactoryClass from "../template.DAO.js";

class proDAO extends FactoryClass {
  constructor() {
    super();
  }

  async getAll() {
    try {
      const productos = await ProductoModel.find({});
      return productos;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async getById(id) {
    try {
      const producto = await ProductoModel.findById(id);
      return producto;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async add(prodNuevo) {
    try {
      return await ProductoModel.create(prodNuevo);
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async deleteById(id) {
    try {
      return await ProductoModel.findByIdAndDelete(id);
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async updateById(id, nuevoProd) {
    try {
      const prodUpdated = await ProductoModel.findByIdAndUpdate(id, {
        nombre: nuevoProd.nombre,
        precio: nuevoProd.precio,
        stock: nuevoProd.stock,
        descripcion: nuevoProd.descripcion,
        codigo: nuevoProd.codigo,
        foto: nuevoProd.foto,
      }, { new: true });
      return prodUpdated;
    } catch (error) {
      return `☠ ${error} `;
    }
  }
}

export default proDAO;
