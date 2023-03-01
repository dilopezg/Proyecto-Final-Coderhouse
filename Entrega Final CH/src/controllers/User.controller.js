import { User } from "../models/User.model.js";
import { generateToken } from "../utils/tokenManager.utils.js";
import sendWP from "../utils/twilio.utils.js";
import winLog from "../utils/winston.utils.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    return res.status(200).json({ Ok: "Ususario Registrado!" });
  } catch (error) {
    winLog.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    sendWP(user); //alerta de login twilio
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    return res.json({ token, expiresIn });
  } catch (error) {
    winLog.error(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("Token");
  res.json({ ok: true });
};
