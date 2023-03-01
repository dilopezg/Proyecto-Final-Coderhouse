import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductoModel = mongoose.model("Producto", Schema);
