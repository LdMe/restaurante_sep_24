import {Router} from "express";
import menuViewController from "../../controllers/menu/menuViewController.js"
const router = Router();

router.get("/", menuViewController.getAll);
router.get("/new", menuViewController.createForm);
router.get("/:id", menuViewController.getById);
router.post("/new", menuViewController.create);
router.get("/:id/update", menuViewController.updateForm);
router.get("/:id/dishes", menuViewController.dishesForm);
router.get("/:id/drinks", menuViewController.drinksForm);
router.post("/:id/update", menuViewController.update);
router.post("/:id/dishes", menuViewController.updateDishes);
router.post("/:id/drinks", menuViewController.updateDrinks);
router.post("/:id/delete", menuViewController.remove);


export default router;