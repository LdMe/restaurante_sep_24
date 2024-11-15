import {Router} from "express";
import menuViewController from "../controllers/menu/menuViewController.js"
const router = Router();

router.get("/",menuViewController.getAll);

router.get("/new",menuViewController.createForm);

router.get("/:id",menuViewController.getById);

router.post("/new",menuViewController.create);

router.get("/:id/update",menuViewController.updateForm);

router.post("/:id/update",menuViewController.update);

router.post("/:id/delete",menuViewController.remove);


export default router;