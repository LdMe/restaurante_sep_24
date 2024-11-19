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
        const newUser = await userController.create(name, last_name, email, tel, password);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        if(error.status){
            res.status(error.status);
        }else{
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, last_name, email, tel, password } = req.body;
        const updatedUser = await userController.update(id, name, last_name, email, tel, password);
        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        if(error.status){
            res.status(error.status);
        }else{
            res.status(500);
        }
        res.json({ error: error.message });

    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const removedUser = await userController.remove(id);
        res.json(removedUser);
    } catch (error) {
        console.error(error);
        if(error.status){
            res.status(error.status);
        }else{
            res.status(500);
        }
        res.json({ error: error.message });
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
