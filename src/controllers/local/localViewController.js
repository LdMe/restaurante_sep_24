
import localController from "../../controllers/local/localController.js"


async function getAll(req, res) {

    const locals = await localController.getAll()
    res.render("local/list", {locals})
}

async function getById(req, res) {
    const id = parseInt(req.params.id)
    const local = await localController.getById(id)
    res.render("local/show", {local})
}

async function create(req, res) {
    const { name, address, phone } = req.body;
    await localController.create(name, address, phone)
    res.render("local")
}

async function update(req, res) {
    const { name, address, phone } = req.body;
    const id = parseInt(req.params.id)
    await localController.update(id, name, address, phone)
    res.redirect("/local" +id)
}

async function remove(id) {
    const id = parseInt(req.params.id)
    await localController.remove(id);
    res.redirect("/local")


}

async function createForm(req, res){
    
    res.render ("local/new")

}

async function updateForm(req, res){
    const id = parseInt(req.params.id)
    const local = await localController.getById(id)
    res.render ("local/update", {local})

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

export default functions