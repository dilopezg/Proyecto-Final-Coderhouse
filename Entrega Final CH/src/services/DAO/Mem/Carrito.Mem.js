import FactoryProd from "../template.DAO.js";

class CarrMem extends FactoryProd {
  constructor() {
    super();
    this.col = [];
  }

  getAll() {
    return [...this.col];
  }

  getById(id) {
    const prod = this.col.find((prod) => prod.id == id);
    return prod;
  }

  add(CarrNuevo) {
    let newId = this.col.length == 0 ? 1 : this.col[this.col.length - 1].id + 1;
    const newProd = { ...CarrNuevo, id: newId };
    this.col.push(newProd);
    return newProd;
  }

  deleteById(id) {
    const delProd = this.col.findIndex((prod) => prod.id == id);
    return this.col.splice(delProd, 1);
  }
}

export default CarrMem;
