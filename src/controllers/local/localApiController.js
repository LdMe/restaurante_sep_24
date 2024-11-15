
import localController from "../../controllers/local/localController.js"


async function getAll(req, res) {

    const locals = await localController.getAll()
    res.json(locals)
}

async function getById(req, res) {
    const id = parseInt(req.params.id)
    const local = await localController.getById(id)
    res.json(local);
}

async function create(req, res) {
    const { name, address, phone } = req.body;
    const newLocal = await localController.create(name, address, phone)
    res.json({ local: newLocal })
}



async function update(req, res) {
    const { name, address, phone } = req.body;
    const id = parseInt(req.params.id)
    const updatedlocal = await localController.update(name, address, phone)
    res.json({ local: updatedlocal })
}

async function remove(id) {
    const id = parseInt(req.params.id)
    const localToRemove = await localController.remove(id);
    res.jason({ local: localToRemove })


}

export const functions = {

    getAll,
    getById,
    create,
    update,
    remove
}

export default functions