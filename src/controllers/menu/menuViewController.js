import menuController from "./menuController.js"

async function getAll(req, res) {
    const menus = await menuController.getAll();
    res.render("menu/list", { menus }); //hacer vista
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const menu = await menuController.getById(id);
    res.render("menu/card", { menu })
}

async function createForm(req, res) {
    res.render("menu/new")
}

async function updateForm(req, res) {
    const id = parseInt(req.params.id);
    const menu = await menuController.getById(id);
    res.render("menu/update", { menu })
}

async function create(req, res) {
    const { name, price } = req.body;
    await menuController.create(name, price)
    res.redirect("/menu");
}

async function update(req, res) {
    const { name, price } = req.body;
    const id = parseInt(req.params.id);
    await menuController.update(id,name,price);
    res.redirect("/menu/" + id);
}

async function remove(req, res) {
    const id = parseInt(req.params.id);
    await menuController.remove(id);
    res.redirect("/menu");
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
