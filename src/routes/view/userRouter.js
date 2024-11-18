import { Router } from "express";
import userViewController from "../../controllers/user/userViewController.js";
const router = Router();

// Lista de usuarios
router.get("/", userViewController.getAll);

// Formulario de creación
router.get("/new", userViewController.createForm);

// Ver detalles de usuario
router.get("/:id", userViewController.getById);

// Crear usuario
router.post("/", userViewController.create);

// Formulario de actualización
router.get("/:id/update", userViewController.updateForm);

// Actualizar usuario
router.post("/:id/update", userViewController.update);

// Formulario de cambio de contraseña
router.get("/:id/update-password", userViewController.updatePasswordForm);

// Actualizar contraseña
router.post("/:id/update-password", userViewController.updatePassword);

// Eliminar usuario
router.post("/:id/delete", userViewController.remove);

export default router;