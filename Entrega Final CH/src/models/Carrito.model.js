import mongoose from "mongoose";

const Schema = new mongoose.Schema(  
  {id: { type: String, require: true }},
  {timestamp: { type: String, required: true }},
  {productos: { type: [], require: true }}
);

export const CarritoModel = mongoose.model("Carrito", Schema);
