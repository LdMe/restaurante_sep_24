// routes/order/orderRouter.js
import { Router } from "express";
import orderViewController from "../../controllers/order/orderViewController.js";
import { isAuthenticated, isClient, isStaff } from "../../middlewares/view/authMiddleware.js";

const router = Router();

// Rutas públicas
router.get("/", isAuthenticated, orderViewController.getAll);

// Rutas específicas para clientes
router.get("/new", isAuthenticated, isClient, orderViewController.createForm);
router.post("/", isAuthenticated, isClient, orderViewController.create);
router.get("/my-orders", isAuthenticated, isClient, orderViewController.getOrdersByClient);

// Ruta para ver pedidos de un local específico (solo staff)
router.get("/local/:localId", isAuthenticated, isStaff, orderViewController.getOrdersByLocal);

// Rutas para pedidos específicos
router.get("/:id", isAuthenticated, orderViewController.getById);
router.post("/:id/delete", isAuthenticated, orderViewController.remove);

export default router;