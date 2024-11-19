import { Router } from "express";
import dishRouter from "./dishRouter.js"
import menuRouter from "./menuRouter.js"
import authRouter from "./authRouter.js";

//import ingredientRouter from "./ingredientRouter.js";
const router = Router();
router.get('/', (req, res) => {
    const {message,messageType}=req.query;
    console.log("message",message,messageType)
    res.render('index',{message,messageType})
});
router.use("/dish",dishRouter);
//router.use("/ingredient",ingredientRouter);

router.use("/menu",menuRouter);

router.use("/",authRouter);

export default router;