import { Router } from "express";
import ingredientViewController from "../../controllers/ingredient/ingredientViewController.js";
const router = Router();

// Lista todos los ingredientes
router.get("/", ingredientViewController.getAll);

// Formulario para crear nuevo ingrediente
router.get("/new", ingredientViewController.createForm);

// Muestra un ingrediente específico
router.get("/:id", ingredientViewController.getById);

// Crea un nuevo ingrediente
router.post("/", ingredientViewController.create);

// Formulario para editar un ingrediente
router.get("/:id/update", ingredientViewController.updateForm);

// Actualiza un ingrediente
router.post("/:id/update", ingredientViewController.update);

// Elimina un ingrediente
router.post("/:id/delete", ingredientViewController.remove);

export default router;