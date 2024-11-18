// routes/drink/drinkRouter.js
import { Router } from "express";
import drinkViewController from "../../controllers/drink/drinkViewController.js";
const router = Router();

// Vista de lista y creación
router.get("/", drinkViewController.getAll);
router.get("/new", drinkViewController.createForm);
router.post("/", drinkViewController.create);

// Operaciones sobre una bebida específica
router.get("/:id", drinkViewController.getById);
router.get("/:id/update", drinkViewController.updateForm);
router.post("/:id/update", drinkViewController.update);
router.post("/:id/delete", drinkViewController.remove);

export default router;