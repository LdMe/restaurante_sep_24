import { Router } from "express";
import orderViewController from "../../controllers/order/orderViewController.js";
import { isClient,isAuthenticated } from "../../middlewares/view/authMiddleware.js";

const router = Router();

router.get("/",isAuthenticated,orderViewController.getAll);

router.post("/dish",isClient,orderViewController.addDish);
router.post("/dish/update",isClient,orderViewController.setDishQuantity);
router.post("/dish/delete",isClient,orderViewController.removeDish);
router.post("/close",isClient,orderViewController.close);


export default router;