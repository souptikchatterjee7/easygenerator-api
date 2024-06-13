import { Router } from "express";
const router = Router();
import { ActivityController } from "./controller.js";
const controller = new ActivityController();
import { AuthClass } from "../../handlers/auth.js";
const auth = new AuthClass();

// register user
router.post("/register", controller.registerUser);

// login user
router.post("/login", controller.loginUser);

// get user profile
router.get("/profile", auth.validate(), controller.getUserProfile);

export { router };
