import dishController from "./dishController.js";

async function getAll(req, res) {
    const dishes = await dishController.getAll();
    res.json(dishes);
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const dish = await dishController.getById(id);
    res.json(dish)
}

async function create(req, res) {
    const { name, description, price, type, ingredients } = req.body;
    const newDish = await dishController.create(name, description, price, type, ingredients)
    res.json({dish:newDish})
}

async function update(req, res) {
    const { name, description, price, type } = req.body;
    const id = parseInt(req.params.id);
    const updatedDish = await dishController.update(id,name,description,price,type);
    res.json({dish:updatedDish})
}

async function remove(req, res) {
    const id = parseInt(req.params.id);
    const removedDish= await dishController.remove(id);
    res.json({dish:removedDish})
}


export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;
