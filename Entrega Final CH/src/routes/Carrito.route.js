import { Router } from "express";
import * as CController from "../controllers/Carrito.controller.js";
import { requireToken } from "../middlewares/requireToken.middle.js";

const router = Router();

router.get("/", requireToken, CController.getCarr);
router.post("/", requireToken, CController.createCarr);

router.get("/:id", requireToken, CController.getCarrito);
router.delete("/:id", requireToken, CController.deleteCarr);

export default router;
