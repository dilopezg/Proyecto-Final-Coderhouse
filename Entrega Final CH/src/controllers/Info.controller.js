import rapsheet from "../utils/Info.utils.js";
import winLog from "../utils/winston.utils.js";

export async function getInfo(req, res) {
  try {
    res.status(200).send(rapsheet);
  } catch (error) {
    winLog.error(error);
    res.status(400).json({ error: error });
  }
}
