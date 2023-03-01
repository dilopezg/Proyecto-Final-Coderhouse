import ProdMongo from "../DAO/mongo/Producto.mongo.js";
import ProdMem from "../DAO/Mem/Producto.Mem.js";

const opcion = process.argv[2] || "mongo";

let dao;
switch (opcion) {
  case "mongo":
    dao = new ProdMongo();
    break;
  case "mem":
    dao = new ProdMem();
    break;
}

export default class DaoFactory {
  static initDao() {
    return dao;
  }
}
