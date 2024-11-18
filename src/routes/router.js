import { Router } from "express";
import apiRouter from "./api/router.js"
import viewRouter from "./view/router.js"


const router = Router();

router.use("/",viewRouter);

router.use("/api",apiRouter);

export default router;