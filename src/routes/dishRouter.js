import {Router} from "express";
import dishController from "../controllers/dish/dishController.js"
const router = Router();

router.get("/",dishController.getAll);

router.get("/new",dishController.createForm);

router.get("/:id",dishController.getById);

router.post("/new",dishController.create);

router.get("/:id/update",dishController.updateForm);

router.post("/:id/update",dishController.update);

router.post("/:id/delete",dishController.remove);


export default router;