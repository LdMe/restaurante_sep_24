import { Router } from "express";
import dishRouter from "./dishRouter.js";
import menuRouter from "./menuRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import ingredientRouter from "./ingredientRouter.js";
import drinkRouter from "./drinkRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/dish",dishRouter);
router.use("/ingredient",ingredientRouter);

router.use("/menu",menuRouter);


router.use("/", authRouter);

router.use("/user", userRouter);

router.use("/drink", drinkRouter);

router.use("/order", orderRouter);

export default router;