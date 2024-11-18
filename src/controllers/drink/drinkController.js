import Drink from "../../models/drinkModel.js";
import Provider from "../../models/providerModel.js";

async function getAll() {
    const drinks = await Drink.findAll({
        include: [
            {
                model: Provider,
                as: 'providers',
                through: { attributes: ['price'] }
            }
        ]
    });
    return drinks;
}

async function getById(id) {
    const drink = await Drink.findByPk(id, {
        include: [
            {
                model: Provider,
                as: 'providers',
                through: { attributes: ['price'] }
            }
        ]
    });
    if (!drink) {
        throw new Error("DRINK_NOT_FOUND");
    }
    return drink;
}

async function create(name, description, price, type) {
    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    const validTypes = ["juice", "water", "alcoholic", "infusion", "soft-drink"];
    if (!validTypes.includes(type)) {
        throw new Error("INVALID_DRINK_TYPE");
    }

    const drink = await Drink.create({
        name,
        description,
        price: price * 100, // Convertir a céntimos
        type
    });

    return getById(drink.drink_id);
}

async function update(id, name, description, price, type) {
    const drink = await Drink.findByPk(id);
    if (!drink) {
        throw new Error("DRINK_NOT_FOUND");
    }

    if (price <= 0) {
        throw new Error("INVALID_PRICE");
    }

    const validTypes = ["juice", "water", "alcoholic", "infusion", "soft-drink"];
    if (!validTypes.includes(type)) {
        throw new Error("INVALID_DRINK_TYPE");
    }

    drink.name = name;
    drink.description = description;
    drink.price = price * 100;
    drink.type = type;

    await drink.save();
    return getById(drink.drink_id);
}

async function remove(id) {
    const drink = await Drink.findByPk(id);
    if (!drink) {
        throw new Error("DRINK_NOT_FOUND");
    }
    await drink.destroy();
    return drink;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
};
export default functions;