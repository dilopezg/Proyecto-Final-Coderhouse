import jwt from "jsonwebtoken";
import winLog from "./winston.utils.js";

export const generateToken = (uid) => {
  const expiresIn = 60 * 60 * 15;

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });

    return { token };
  } catch (error) {
    winLog.error(error);
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
};
