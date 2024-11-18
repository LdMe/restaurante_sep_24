import Menu from "../../models/menuModel.js";
import Dish from "../../models/dishModel.js";
import Drink from "../../models/drinkModel.js";

async function getAll() {
    const menus = await Menu.findAll({
        include: [
            { model: Dish },
            { model: Drink }
        ]
    });
    return menus;
}

async function getById(id) {
    const menu = await Menu.findByPk(id, {
        include: [
            { model: Dish },
            { model: Drink }
        ]
    });
    if (!menu) {
        throw new Error("MENU_NOT_FOUND");
    }
    return menu;
}

async function create(name, price, dishes = [], drinks = []) {
    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    const menu = await Menu.create({
        name,
        price: price * 100, // Convertir a céntimos
    });

    if (dishes.length > 0) {
        await menu.addDishes(dishes);
    }

    if (drinks.length > 0) {
        await menu.addDrinks(drinks);
    }

    return getById(menu.menu_id);
}

async function update(id, name, price) {
    const menu = await Menu.findByPk(id);
    if (!menu) {
        throw new Error("MENU_NOT_FOUND");
    }

    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    menu.name = name;
    menu.price = price * 100;

    await menu.save();
    return getById(menu.menu_id);
}

async function updateDishes(id, dishes) {
    const menu = await Menu.findByPk(id);
    if (!menu) {
        throw new Error("MENU_NOT_FOUND");
    }

    await menu.setDishes(dishes);
    return getById(menu.menu_id);
}

async function updateDrinks(id, drinks) {
    const menu = await Menu.findByPk(id);
    if (!menu) {
        throw new Error("MENU_NOT_FOUND");
    }

    await menu.setDrinks(drinks);
    return getById(menu.menu_id);
}

async function remove(id) {
    const menu = await Menu.findByPk(id);
    if (!menu) {
        throw new Error("MENU_NOT_FOUND");
    }
    await menu.destroy();
    return menu;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    updateDishes,
    updateDrinks,
    remove
};
export default functions;