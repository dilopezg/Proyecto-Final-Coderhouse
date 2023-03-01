import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    descripcion: String,
    codigo: String,
    foto: String,
  },
  {
    timestamps: true,
  }
);

export const CarritoModel = mongoose.model("Carrito", Schema);
