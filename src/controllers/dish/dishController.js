//import dishModel from "../../models/dishModel.js"
import Dish from "../../models/dishModel.js";
import Ingredient from "../../models/ingredientModel.js";

async function getAll() {
    const dishes = await Dish.findAll({
        include: [{ model: Ingredient }]
    });
    return dishes;
}

async function getById(id) {
    const dish = await Dish.findByPk(id, {
        include: [{ model: Ingredient }]
    });
    if (!dish) {
        throw new Error("DISH_NOT_FOUND");
    }
    return dish;
}

async function create(name, description, price, type, ingredients) {
    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    const validTypes = ["starter", "first-course", "second-course", "dessert"];
    if (!validTypes.includes(type)) {
        throw new Error("INVALID_DISH_TYPE");
    }

    const dish = await Dish.create({
        name,
        description,
        price: price * 100, // Convertir a céntimos
        type
    });

    if (ingredients) {
      console.log("Agregando ingredientes:", ingredients);
        await dish.addIngredients(ingredients);
    }

    return getById(dish.dish_id);
}

async function update(id, name, description, price, type) {
    const dish = await Dish.findByPk(id);
    if (!dish) {
        throw new Error("DISH_NOT_FOUND");
    }

    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    const validTypes = ["starter", "first-course", "second-course", "dessert"];
    if (!validTypes.includes(type)) {
        throw new Error("INVALID_DISH_TYPE");
    }

    dish.name = name;
    dish.description = description;
    dish.price = price * 100;
    dish.type = type;

    await dish.save();
    return getById(dish.dish_id);
}

async function updateIngredients(id, ingredients) {
    const dish = await Dish.findByPk(id);
    if (!dish) {
        throw new Error("DISH_NOT_FOUND");
    }

    await dish.setIngredients(ingredients);
    return getById(dish.dish_id);
}

async function remove(id) {
    const dish = await Dish.findByPk(id);
    if (!dish) {
        throw new Error("DISH_NOT_FOUND");
    }
    await dish.destroy();
    return dish;
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