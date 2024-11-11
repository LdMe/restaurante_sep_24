import {Router} from "express";
import drinkController from "../controllers/drink/drinkController.js"
const router = Router();

router.get("/",drinkController.getAll);

router.get("/:id",drinkController.getById);

router.get("/new",drinkController.createForm);

router.post("/",drinkController.create);

router.get("/:id/update",drinkController.updateForm);

router.post("/:id",drinkController.update);

router.post("/:id/delete",drinkController.remove);


export default router;