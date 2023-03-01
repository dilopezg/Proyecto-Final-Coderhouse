import { Router } from "express";
import * as PController from "../controllers/Producto.controller.js";
import { requireToken } from "../middlewares/requireToken.middle.js";

const router = Router();

router.get("/", PController.getProd);
router.post("/", requireToken, PController.createProd);

router.get("/:id", PController.getProducto);
router.put("/:id", requireToken, PController.updateProd);
router.delete("/:id", requireToken, PController.deleteProd);

export default router;
