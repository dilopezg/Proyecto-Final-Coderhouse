import DaoFactory from "../services/factory/Carrito.factory.js";
import { CarrAsDto } from "../services/DTO/carrito.DTO.js";
import sendMailGmail from "../utils/nodemailer.utils.js";
import winLog from "../utils/winston.utils.js";

let carrInFactory = DaoFactory.initDao();

export async function getCarr(req, res) {
  try {
    let carrito = await carrInFactory.getAll();
    res.status(200).json(CarrAsDto(carrito));
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function createCarr(req, res) {
  try {
    const { nombre, precio, descripcion, codigo, foto } = req.body;
    const Carr = {
      nombre,
      precio,
      descripcion,
      codigo,
      foto,
    };
    const newCarrito = await carrInFactory.add(Carr);
    res.status(200).json(CarrAsDto(newCarrito));
    sendMailGmail(newCarrito); //resumen compra nodemailer
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function getCarrito(req, res) {
  try {
    const id = req.params.id;
    const carrito = await carrInFactory.getById(id);
    if (carrito === null) {
      res.status(400).json({ error: "El carrito No Existe" });
    } else {
      res.status(200).json(CarrAsDto(carrito));
    }
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}

export async function deleteCarr(req, res) {
  try {
    const id = req.params.id;
    await carrInFactory.deleteById(id);
    res.status(200).json({ message: "El Producto ha sido eliminado ✅" });
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}
