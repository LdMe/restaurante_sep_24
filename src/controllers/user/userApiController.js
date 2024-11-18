import userController from "./userController.js"

async function getAll(req, res) {
    try {
        const users = await userController.getAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.getById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
}

async function create(req, res) {
    try {
        const { name, last_name, email, tel, password } = req.body;
        const oldUser = await userController.getByEmail(email);
        if (oldUser) {
            return res.status(409).json({ error: "There is another user with the same email" });
        }
        const newUser = await userController.create(name, last_name, email, tel, password);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, last_name, email, tel, password } = req.body;
        console.log("body", req.body)
        const updatedUser = await userController.update(id, name, last_name, email, tel, password);
        if (updatedUser.error) {
            res.status(updatedUser.status);
        }
        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const removedUser = await userController.remove(id);
        if (removedUser.error) {
            res.status(removedUser.status);
        }
        res.json(removedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;
