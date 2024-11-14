import dishController from "./dishController.js";
import ingredientController from "../ingredient/ingredientController.js";

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

];
async function getAll(req, res) {
    const dishes = await dishController.getAll();
    res.render("dish/list", { dishes });
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const dish = await dishController.getById(id);
    res.render("dish/show", { dish })
}

async function createForm(req, res) {
    const ingredients = await ingredientController.getAll();
    res.render("dish/new", { types, ingredients })
}

async function updateForm(req, res) {
    const id = parseInt(req.params.id);
    const dish = await dishController.getById(id);
    res.render("dish/update", { types, dish })
}

async function create(req, res) {
    const { name, description, price, type, ingredients } = req.body;
    await dishController.create(name, description, price, type, ingredients)
    res.redirect("/dish");
}

async function update(req, res) {
    const { name, description, price, type } = req.body;
    const id = parseInt(req.params.id);
    await dishController.update(id,name,description,price,type);
    res.redirect("/dish/" + id);
}

async function remove(req, res) {
    const id = parseInt(req.params.id);
    await dishController.remove(id);
    res.redirect("/dish");
}


export const functions = {
    getAll,
    getById,
    create,
    createForm,
    updateForm,
    update,
    remove
}
export default functions;
