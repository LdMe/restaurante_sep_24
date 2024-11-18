import {Router} from "express";
import ingredientController from "../../controllers/ingredient/ingredientController.js"
const router = Router();

router.get("/",ingredientController.getAll);

router.get("/new",ingredientController.createForm);

router.get("/:id",ingredientController.getById);

router.post("/new",ingredientController.create);

router.post("/:id/delete",ingredientController.remove);


export default router;