import drinkController from "./drinkController.js";

async function getAll(req, res) {
    try {
        const drinks = await drinkController.getAll();
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await drinkController.getById(id);
        res.json(drink);
    } catch (error) {
        if (error.message === "DRINK_NOT_FOUND") {
            res.status(404).json({ error: "Drink not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { name, description, price, type } = req.body;
        
        if (!name || !price || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const drink = await drinkController.create(name, description, price, type);
        res.status(201).json(drink);
    } catch (error) {
        switch (error.message) {
            case "INVALID_PRICE":
                res.status(400).json({ error: "Price must be greater than 0" });
                break;
            case "INVALID_DRINK_TYPE":
                res.status(400).json({ error: "Invalid drink type" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, type } = req.body;
        
        if (!name || !price || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const drink = await drinkController.update(id, name, description, price, type);
        res.json(drink);
    } catch (error) {
        switch (error.message) {
            case "DRINK_NOT_FOUND":
                res.status(404).json({ error: "Drink not found" });
                break;
            case "INVALID_PRICE":
                res.status(400).json({ error: "Price must be greater than 0" });
                break;
            case "INVALID_DRINK_TYPE":
                res.status(400).json({ error: "Invalid drink type" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await drinkController.remove(id);
        res.status(204).end();
    } catch (error) {
        if (error.message === "DRINK_NOT_FOUND") {
            res.status(404).json({ error: "Drink not found" });
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