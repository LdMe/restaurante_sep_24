import { Router } from "express";
import dishRouter from "./dishRouter.js";
import menuRouter from "./menuRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import ingredientRouter from "./ingredientRouter.js";
const router = Router();

router.use("/dish",dishRouter);
router.use("/ingredient",ingredientRouter);

router.use("/menu",menuRouter);


router.use("/", authRouter);

router.use("/user", userRouter);

export default router;