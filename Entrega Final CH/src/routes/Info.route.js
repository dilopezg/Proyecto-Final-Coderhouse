import { Router } from "express";
import { getInfo } from "../controllers/Info.controller.js";

const router = Router();

router.get("/", getInfo);

export default router;
