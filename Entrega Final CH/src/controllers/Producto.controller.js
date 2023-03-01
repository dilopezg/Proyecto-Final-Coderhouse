import DaoFactory from "../services/factory/Producto.factory.js";
import { asDto } from "../services/DTO/productos.DTO.js";
import winLog from "../utils/winston.utils.js";

let prodInFactory = DaoFactory.initDao();

export async function getProd(req, res) {
  try {
    let productos = await prodInFactory.getAll();
    res.status(200).json(asDto(productos));
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function createProd(req, res) {
  try {
    const { nombre, precio, stock, descripcion, codigo, foto } = req.body;
    const newProd = {
      nombre,
      precio,
      stock,
      descripcion,
      codigo,
      foto,
    };
    const nuevoProd = await prodInFactory.add(newProd);
    res.status(200).json(asDto(nuevoProd));
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function getProducto(req, res) {
  try {
    const id = req.params.id;
    const producto = await prodInFactory.getById(id);
    if (producto === null) {
      res.status(400).json({ error: "El producto No Existe" });
    } else {
      res.status(200).json(asDto(producto));
    }
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function deleteProd(req, res) {
  try {
    const id = req.params.id;
    await prodInFactory.deleteById(id);
    res.status(200).json({ message: "El Producto ha sido eliminado ✅" });
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function updateProd(req, res) {
  try {
    const _id = req.params.id;
    const data = { ...req.body };
    const updatedProd = await prodInFactory.updateById(_id, data);
    return res
      .status(200)
      .json({ updatedProd, mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}
