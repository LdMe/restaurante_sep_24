import {Router} from "express";
import dishViewController from "../../controllers/dish/dishViewController.js"
const router = Router();

router.get("/",dishViewController.getAll);

router.get("/new",dishViewController.createForm);

router.get("/:id",dishViewController.getById);

router.post("/new",dishViewController.create);

router.get("/:id/update",dishViewController.updateForm);

router.get('/:id/ingredients', dishViewController.ingredientsForm);

router.post("/:id/update",dishViewController.update);

router.post('/:id/ingredients', dishViewController.updateIngredients);

router.post("/:id/delete",dishViewController.remove);


export default router;