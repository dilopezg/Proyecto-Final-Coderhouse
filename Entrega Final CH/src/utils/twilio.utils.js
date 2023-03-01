import "dotenv/config";
import twilio from "twilio";
import winLog from "./winston.utils.js";

const client = twilio(process.env.SID, process.env.TOKEN);

const sendWP = async (data) => {
  const nombre = data.email;
  try {
    const message = {
      body: `Detectamos que ${nombre} intenta loguearse!`,
      from: `whatsapp:${process.env.NUM_TWILIO}`,
      to: `whatsapp:${process.env.NUM_MIO}`,
    };
    const response = await client.messages.create(message);
    winLog.info(response);
  } catch (error) {
    winLog.error(error);
  }
};

export default sendWP;
