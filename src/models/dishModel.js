const dishes = [
    {
        dish_id: 1,
        name: "Gazpacho andaluz",
        description: "Sopa fría tradicional española con tomate, pepino, pimiento y ajo",
        price: 850,
        type: "starter"
    },
    {
        dish_id: 2,
        name: "Jamón ibérico",
        description: "Selección de jamón ibérico de bellota con pan cristal",
        price: 2400,
        type: "starter"
    },
    {
        dish_id: 3,
        name: "Paella valenciana",
        description: "Arroz con pollo, conejo y verduras de temporada",
        price: 2200,
        type: "first-course"
    },
    {
        dish_id: 4,
        name: "Fideuá de mariscos",
        description: "Fideos finos con sepia, gambas y almejas",
        price: 1900,
        type: "first-course"
    },
    {
        dish_id: 5,
        name: "Solomillo a la pimienta",
        description: "Solomillo de ternera con salsa de pimienta y patatas asadas",
        price: 2600,
        type: "second-course"
    },
    {
        dish_id: 6,
        name: "Lubina a la espalda",
        description: "Lubina salvaje a la plancha con ajetes y aceite de oliva",
        price: 2400,
        type: "second-course"
    },
    {
        dish_id: 7,
        name: "Tarta de queso",
        description: "Tarta casera de queso con coulis de frutos rojos",
        price: 750,
        type: "dessert"
    },
    {
        dish_id: 8,
        name: "Crema catalana",
        description: "Crema catalana tradicional con azúcar caramelizado",
        price: 650,
        type: "dessert"
    },
    {
        dish_id: 9,
        name: "Croquetas caseras",
        description: "Croquetas de jamón ibérico hechas a mano",
        price: 1200,
        type: "starter"
    },
    {
        dish_id: 10,
        name: "Ensalada de la casa",
        description: "Mezcla de lechugas, tomate, cebolla, atún y aceitunas",
        price: 1100,
        type: "first-course"
    }
];
const types=[
    {
        value:"starter",
        name:"Entrante"
    },
    {
        value:"first-course",
        name:"Primer Plato"
    },
    {
        value:"second-course",
        name:"Segundo Plato"
    },
    {
        value:"dessert",
        name:"Postre"
    }

]
let LAST_ID = dishes.length;

function getAll() {
    return dishes;
}

function getById(dish_id) {
    const dish = dishes.find(element => element.dish_id === dish_id);
    return dish;
}

function create(name, description, price, type) {
    const newDish = {
        dish_id: ++LAST_ID,
        name,
        description,
        price:parseInt(price),
        type
    }
    dishes.push(newDish);
    return newDish;
}

function update(dish_id, data) {
    const dish = getById(dish_id);
    const updatedDish = { ...dish, ...data };
    const index = dishes.findIndex(element => element.dish_id === dish_id);
    dishes.splice(index,1,updatedDish);
    return updatedDish;
}

function remove(dish_id){
    const index = dishes.findIndex(element => element.dish_id === dish_id);
    const removedElement = dishes.splice(index,1);
    return removedElement;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    types
}
export default functions;