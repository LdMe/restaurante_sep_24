import { Router } from "express";
import authViewController from "../../controllers/auth/authViewController.js";

const router = Router();

router.get("/login", authViewController.loginForm);
router.get("/register", authViewController.registerForm);

router.post("/login", authViewController.login);
router.post("/register", authViewController.register);

export default router;