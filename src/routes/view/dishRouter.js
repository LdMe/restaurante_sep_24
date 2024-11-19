import {Router} from "express";
import dishViewController from "../../controllers/dish/dishViewController.js";
import { isAuthenticated,isAdmin } from "../../middlewares/view/authMiddleware.js";
const router = Router();

router.get("/",dishViewController.getAll);

router.get("/new",isAdmin,dishViewController.createForm);

router.get("/:id",dishViewController.getById);

router.post("/new",isAdmin,dishViewController.create);

router.get("/:id/update",isAdmin,dishViewController.updateForm);

router.post("/:id/update",isAdmin,dishViewController.update);

router.post("/:id/delete",isAdmin,dishViewController.remove);


export default router;