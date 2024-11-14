const drinks = [
    {
        drink_id: 1,
        name: "Zumo de naranja natural",
        type: "juice",
        description: "Exprimido al momento",
        price: 350
    },
    {
        drink_id: 2,
        name: "Agua mineral Lanjarón",
        type: "water",
        description: "1L, con/sin gas",
        price: 250
    },
    {
        drink_id: 3,
        name: "Rioja crianza",
        type: "alcoholic",
        description: "Copa de vino tinto",
        price: 450
    },
    {
        drink_id: 4,
        name: "Té verde",
        type: "infusion",
        description: "Con opción de limón o menta",
        price: 250
    },
    {
        drink_id: 5,
        name: "Coca-Cola",
        type: "soft-drink",
        description: "33cl, normal/zero/light",
        price: 280
    },
    {
        drink_id: 6,
        name: "Zumo de piña colada",
        type: "juice",
        description: "Piña y coco natural",
        price: 380
    },
    {
        drink_id: 7,
        name: "Cerveza Alhambra 1925",
        type: "alcoholic",
        description: "33cl, reserva especial",
        price: 400
    },
    {
        drink_id: 8,
        name: "Manzanilla",
        type: "infusion",
        description: "Infusión natural",
        price: 220
    },
    {
        drink_id: 9,
        name: "Fanta naranja",
        type: "soft-drink",
        description: "33cl, refresco",
        price: 280
    },
    {
        drink_id: 10,
        name: "Vichy Catalán",
        type: "water",
        description: "50cl, agua con gas",
        price: 280
    },
    {
        drink_id: 11,
        name: "Albariño",
        type: "alcoholic",
        description: "Copa de vino blanco",
        price: 420
    },
    {
        drink_id: 12,
        name: "Sprite",
        type: "soft-drink",
        description: "33cl, lima-limón",
        price: 280
    },
    {
        drink_id: 13,
        name: "Poleo menta",
        type: "infusion",
        description: "Infusión digestiva",
        price: 220
    },
    {
        drink_id: 14,
        name: "Zumo de mango",
        type: "juice",
        description: "100% natural",
        price: 350
    },
    {
        drink_id: 15,
        name: "Tinto de verano",
        type: "alcoholic",
        description: "Vino tinto con gaseosa",
        price: 320
    }
];



let LAST_ID = drinks.length;

function getAll() {
    return drinks;
}

function getById(drink_id) {
    const drink = drinks.find(element => element.drink_id === drink_id);
    return drink;
}

function create(name, description, price, type) {
    const newDrink = {
        drink_id: ++LAST_ID,
        name,
        description,
        price,
        type
    }
    drinks.push(newDrink);
    return newDrink;
}

function update(drink_id, data) {
    const drink = getById(drink_id);
    const updatedDrink = { ...drink, ...data };
    const index = drinks.findIndex(element => element.drink_id === drink_id);
    drinks.splice(index, 1, updatedDrink);
    return updatedDrink;
}

function remove(drink_id) {
    const index = drinks.findIndex(element => element.drink_id === drink_id);
    const removedElement = drinks.splice(index, 1);
    return removedElement;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;