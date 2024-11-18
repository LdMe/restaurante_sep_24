import dishController from "./dishController.js";

async function getAll(req, res) {
    try {
        const dishes = await dishController.getAll();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const dish = await dishController.getById(id);
        res.json(dish);
    } catch (error) {
        if (error.message === "DISH_NOT_FOUND") {
            res.status(404).json({ error: "Dish not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { name, description, price, type, ingredients } = req.body;
        
        if (!name || !price || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const dish = await dishController.create(name, description, price, type, ingredients);
        res.status(201).json(dish);
    } catch (error) {
        switch (error.message) {
            case "INVALID_PRICE":
                res.status(400).json({ error: "Price must be greater than 0" });
                break;
            case "INVALID_DISH_TYPE":
                res.status(400).json({ error: "Invalid dish type" });
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

        const dish = await dishController.update(id, name, description, price, type);
        res.json(dish);
    } catch (error) {
        switch (error.message) {
            case "DISH_NOT_FOUND":
                res.status(404).json({ error: "Dish not found" });
                break;
            case "INVALID_PRICE":
                res.status(400).json({ error: "Price must be greater than 0" });
                break;
            case "INVALID_DISH_TYPE":
                res.status(400).json({ error: "Invalid dish type" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function updateIngredients(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { ingredients } = req.body;
        
        if (!ingredients) {
            return res.status(400).json({ error: "Missing ingredients" });
        }

        const dish = await dishController.updateIngredients(id, ingredients);
        res.json(dish);
    } catch (error) {
        if (error.message === "DISH_NOT_FOUND") {
            res.status(404).json({ error: "Dish not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await dishController.remove(id);
        res.status(204).end();
    } catch (error) {
        if (error.message === "DISH_NOT_FOUND") {
            res.status(404).json({ error: "Dish not found" });
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
    updateIngredients,
    remove
};
export default functions;
