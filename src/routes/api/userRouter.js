import {Router} from "express";
import userApiController from "../../controllers/user/userApiController.js"
import { isAuthenticated,isAdmin, isAdminOrSelfUser} from "../../middlewares/api/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/",userApiController.getAll);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", userApiController.getById);


router.post("/",userApiController.create);


router.put("/:id",userApiController.update);

router.delete("/:id",userApiController.remove);


export default router;