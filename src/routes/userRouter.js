import {Router} from "express";
import userController from "../controllers/user/userController.js"
const router = Router();

router.get("/",userController.getAll);

router.get("/:id",userController.getById);

router.get("/new",userController.createForm);

router.post("/",userController.create);

router.get("/:id/update",userController.updateForm);

router.post("/:id",userController.update);

router.post("/:id/delete",userController.remove);


export default router;