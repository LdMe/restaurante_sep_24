import authController from "./authController.js";
import jwt from "../../config/jwt.js";

async function register(req, res) {
    try {
        const { name, email, last_name, tel, password, passwordConfirm } = req.body;
        const result = await authController.register(name, last_name, email, tel, password, passwordConfirm);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        const token = jwt.sign({user_id:user.user_id,role:user.role});
        res.json({token});
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }

}

export default {
    register,
    login
}