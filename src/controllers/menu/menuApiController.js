import menuController from "./menuController.js";

async function getAll(req, res) {
    try {
        const menus = await menuController.getAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const menu = await menuController.getById(id);
        res.json(menu);
    } catch (error) {
        if (error.message === "MENU_NOT_FOUND") {
            res.status(404).json({ error: "Menu not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { name, price, dishIds, drinkIds } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const menu = await menuController.create(name, price, dishIds, drinkIds);
        res.status(201).json(menu);
    } catch (error) {
        if (error.message === "INVALID_PRICE") {
            res.status(400).json({ error: "Price must be greater than 0" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, price, dishIds, drinkIds } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const menu = await menuController.update(id, name, price, dishIds, drinkIds);
        res.json(menu);
    } catch (error) {
        switch (error.message) {
            case "MENU_NOT_FOUND":
                res.status(404).json({ error: "Menu not found" });
                break;
            case "INVALID_PRICE":
                res.status(400).json({ error: "Price must be greater than 0" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const menu = await menuController.remove(id);
        res.json(menu);
    } catch (error) {
        if (error.message === "MENU_NOT_FOUND") {
            res.status(404).json({ error: "Menu not found" });
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
    remove
};
export default functions;