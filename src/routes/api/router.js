import { Router } from "express";
import userRouter from './userRouter.js';
import authApiController from "../../controllers/auth/authApiController.js";

const router = Router();

router.use("/user",userRouter)

router.post("/login",authApiController.login)
router.post("/register",authApiController.register);

export default router;