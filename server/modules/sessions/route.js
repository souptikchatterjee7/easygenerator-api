import { Router } from "express";
const router = Router();
import { SessionController } from "./controller.js";
const controller = new SessionController();

export { router };
