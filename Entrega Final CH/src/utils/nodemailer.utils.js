import "dotenv/config";
import { createTransport } from "nodemailer";
import winLog from "./winston.utils.js";

const transporterGmail = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL,
  },
});

const sendMailGmail = async (objCompra) => {
  const mailOptions = {
    from: process.env.EMAIL_NODEMAILER,
    to: [process.env.USER_GMAIL, process.env.EMAIL_NODEMAILER],
    subject: "Compra",
    text: "Gracias por comprar en Ecommerce",
    html: `<h1>Su Orden :</h1>
    <br>
    <h5>Datos del Producto</h5>
    <ul>
        <li>Nombre Producto: ${objCompra.nombre}</li>
        <li>Precio Producto: ${objCompra.precio}</li>
        <li>Descripcion: ${objCompra.descripcion}</li>
        <li>Codigo: ${objCompra.codigo}</li>
        <li>foto: ${objCompra.foto}</li>
    </ul>
    <br>`,
  };
  try {
    const response = await transporterGmail.sendMail(mailOptions);
    winLog.info(response);
  } catch (error) {
    winLog.error(error);
  }
};

export default sendMailGmail;
