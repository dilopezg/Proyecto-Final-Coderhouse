import carrDAO from "../DAO/mongo/Carrito.mongo.js";
import CarrMem from "../DAO/Mem/Carrito.Mem.js";

const opcion = process.argv[2] || "mongo";

let dao;
switch (opcion) {
  case "mongo":
    dao = new carrDAO();
    break;
  case "mem":
    dao = new CarrMem();
    break;
}

export default class DaoFactory {
  static initDao() {
    return dao;
  }
}
