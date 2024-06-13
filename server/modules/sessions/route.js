import { Router } from "express";
const router = Router();
import { SessionController } from "./controller.js";
const controller = new SessionController();

// get new token
router.post("/get-token", controller.generateNewToken);

export { router };
