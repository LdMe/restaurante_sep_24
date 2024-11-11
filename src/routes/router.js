import { Router } from "express";
import dishRouter from "./dishRouter.js"

const router = Router();

router.use("/dish",dishRouter);

export default router;