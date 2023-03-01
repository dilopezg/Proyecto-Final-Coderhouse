import { Router } from "express";
import { login, logout, register } from "../controllers/User.controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validatorManager.middle.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/logout", logout);

export default router;
