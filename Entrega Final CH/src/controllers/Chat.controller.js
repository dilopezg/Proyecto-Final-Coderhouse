import "../services/DAO/mongo/db.config.js";
import { ChatModel } from "../models/Chat.model.js";
import winLog from "../utils/winston.utils.js";

class ChatClass {
  constructor() {}

  async getAll() {
    try {
      const msj = await ChatModel.find();
      return msj;
    } catch (error) {
      winLog.error(error);
    }
  }

  async getById(email) {
    try {
      const msj = await ChatModel.find({ nombre: email });
      return msj;
    } catch (error) {
      winLog.error(error);
    }
  }

  async add(msj) {
    try {
      const newMsj = await new ChatModel(msj);
      await newMsj.save();
    } catch (error) {
      winLog.error(error);
    }
  }
}

export default ChatClass;
