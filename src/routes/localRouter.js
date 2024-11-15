import {Router} from "express";
import localController from "../controllers/local/localController.js"
const router = Router();

router.get("/",localController.getAll);

router.get("/:id",localController.getById);

router.get("/new",localController.createForm);

router.post("/",localController.create);

router.get("/:id/update",localController.updateForm);

router.post("/:id",localController.update);

router.post("/:id/delete",localController.remove);


export default router;