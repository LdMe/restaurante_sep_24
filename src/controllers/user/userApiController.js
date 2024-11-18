import userController from "./userController.js";

async function getAll(req, res) {
    try {
        const users = await userController.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.getById(id);
        res.json(user);
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { name, lastName, email, tel, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await userController.create(name, lastName, email, tel, password, role);
        res.status(201).json(user);
    } catch (error) {
        switch (error.message) {
            case "EMAIL_ALREADY_EXISTS":
                res.status(400).json({ error: "Email already in use" });
                break;
            case "INVALID_ROLE":
                res.status(400).json({ error: "Invalid role" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, lastName, email, tel, role } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await userController.update(id, name, lastName, email, tel, role);
        res.json(user);
    } catch (error) {
        switch (error.message) {
            case "USER_NOT_FOUND":
                res.status(404).json({ error: "User not found" });
                break;
            case "EMAIL_ALREADY_EXISTS":
                res.status(400).json({ error: "Email already in use" });
                break;
            case "INVALID_ROLE":
                res.status(400).json({ error: "Invalid role" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function updatePassword(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        await userController.updatePassword(id, currentPassword, newPassword);
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        switch (error.message) {
            case "USER_NOT_FOUND":
                res.status(404).json({ error: "User not found" });
                break;
            case "INVALID_PASSWORD":
                res.status(400).json({ error: "Current password is incorrect" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await userController.remove(id);
        res.status(204).end();
    } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function authenticate(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }

        const user = await userController.authenticate(email, password);
        res.json(user);
    } catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
            res.status(401).json({ error: "Invalid credentials" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    updatePassword,
    remove,
    authenticate
};
export default functions;