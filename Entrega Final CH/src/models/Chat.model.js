import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    mensaje: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatModel = mongoose.model("Chat", Schema);
