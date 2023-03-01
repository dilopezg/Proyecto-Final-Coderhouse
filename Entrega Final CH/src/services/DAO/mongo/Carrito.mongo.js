import "./db.config.js";
import { CarritoModel } from "../../../models/Carrito.model.js";
import FactoryClass from "../template.DAO.js";

class carrDAO extends FactoryClass {
  constructor() {
    super();
  }

  async getAll() {
    try {
      const items = await CarritoModel.find({});
      return items;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async getById(id) {
    try {
      const item = await CarritoModel.findById(id);
      return item;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async add(prodNuevo) {
    try {
      return await CarritoModel.create(prodNuevo);
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async deleteById(id) {
    try {
      return await CarritoModel.findByIdAndDelete(id);
    } catch (error) {
      return `☠ ${error} `;
    }
  }
}

export default carrDAO;
