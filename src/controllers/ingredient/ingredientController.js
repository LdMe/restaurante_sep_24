import Ingredient from "../../models/ingredientModel.js";
import Dish from "../../models/dishModel.js";
import Provider from "../../models/providerModel.js";

async function getAll() {
    const ingredients = await Ingredient.findAll({
        include: [
            { model: Provider, as: 'providers' },
            { model: Dish }
        ]
    });
    return ingredients;
}

async function getById(id) {
    const ingredient = await Ingredient.findByPk(id, {
        include: [
            { model: Provider, as: 'providers' },
            { model: Dish }
        ]
    });
    if (!ingredient) {
        throw new Error("INGREDIENT_NOT_FOUND");
    }
    return ingredient;
}

async function create(name) {
    if (!name || name.trim() === '') {
        throw new Error("INVALID_NAME");
    }

    // Verificar si ya existe un ingrediente con ese nombre
    const existingIngredient = await Ingredient.findOne({
        where: { name: name.trim() }
    });

    if (existingIngredient) {
        throw new Error("INGREDIENT_ALREADY_EXISTS");
    }

    const ingredient = await Ingredient.create({
        name: name.trim()
    });

    return getById(ingredient.ingredient_id);
}

async function update(id, name) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
        throw new Error("INGREDIENT_NOT_FOUND");
    }

    if (!name || name.trim() === '') {
        throw new Error("INVALID_NAME");
    }

    // Verificar si ya existe otro ingrediente con ese nombre
    const existingIngredient = await Ingredient.findOne({
        where: { name: name.trim() }
    });

    if (existingIngredient && existingIngredient.ingredient_id !== id) {
        throw new Error("INGREDIENT_ALREADY_EXISTS");
    }

    ingredient.name = name.trim();
    await ingredient.save();
    
    return getById(ingredient.ingredient_id);
}

async function remove(id) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
        throw new Error("INGREDIENT_NOT_FOUND");
    }

    await ingredient.destroy();
    return ingredient;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
};
export default functions;