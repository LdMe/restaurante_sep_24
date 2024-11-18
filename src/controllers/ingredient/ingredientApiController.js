import ingredientController from "./ingredientController.js";

async function getAll(req, res) {
    try {
        const ingredients = await ingredientController.getAll();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const ingredient = await ingredientController.getById(id);
        res.json(ingredient);
    } catch (error) {
        if (error.message === "INGREDIENT_NOT_FOUND") {
            res.status(404).json({ error: "Ingredient not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const ingredient = await ingredientController.create(name);
        res.status(201).json(ingredient);
    } catch (error) {
        switch (error.message) {
            case "INVALID_NAME":
                res.status(400).json({ error: "Invalid name" });
                break;
            case "INGREDIENT_ALREADY_EXISTS":
                res.status(400).json({ error: "An ingredient with this name already exists" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const ingredient = await ingredientController.update(id, name);
        res.json(ingredient);
    } catch (error) {
        switch (error.message) {
            case "INGREDIENT_NOT_FOUND":
                res.status(404).json({ error: "Ingredient not found" });
                break;
            case "INVALID_NAME":
                res.status(400).json({ error: "Invalid name" });
                break;
            case "INGREDIENT_ALREADY_EXISTS":
                res.status(400).json({ error: "An ingredient with this name already exists" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await ingredientController.remove(id);
        res.status(204).end();
    } catch (error) {
        if (error.message === "INGREDIENT_NOT_FOUND") {
            res.status(404).json({ error: "Ingredient not found" });
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