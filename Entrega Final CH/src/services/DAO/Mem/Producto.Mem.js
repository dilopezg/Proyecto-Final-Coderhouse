import FactoryProd from "../template.DAO.js";

class ProdMem extends FactoryProd {
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

  add(prodNuevo) {
    let newId = this.col.length == 0 ? 1 : this.col[this.col.length - 1].id + 1;
    const newProd = { ...prodNuevo, id: newId };
    this.col.push(newProd);
    return newProd;
  }

  deleteById(id) {
    const delProd = this.col.findIndex((prod) => prod.id == id);
    return this.col.splice(delProd, 1);
  }

  updateById(item) {
    const index = this.col.findIndex((prod) => prod.id == item.id);
    this.col[index] = item;
    return item;
  }
}

export default ProdMem;
