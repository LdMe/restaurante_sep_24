// controllers/drink/drinkViewController.js
import drinkController from "./drinkController.js";
import { drinkTypeLabels } from "../../helpers/drinkHelpers.js";

const types = Object.entries(drinkTypeLabels).map(([value, name]) => ({ value, name }));

async function getAll(req, res) {
    try {
        const drinks = await drinkController.getAll();
        res.render("drink/list", {
            drinks,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("drink/list", {
            drinks: [],
            message: "Error al cargar las bebidas",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await drinkController.getById(id);
        res.render("drink/show", { drink });
    } catch (error) {
        console.error(error);
        if (error.message === "DRINK_NOT_FOUND") {
            res.redirect("/drink?message=Bebida no encontrada&messageType=error");
        } else {
            res.redirect("/drink?message=Error al cargar la bebida&messageType=error");
        }
    }
}

async function createForm(req, res) {
    res.render("drink/new", {
        types,
        message: req.query.message,
        messageType: req.query.messageType
    });
}

async function create(req, res) {
    try {
        const { name, description, price, type } = req.body;

        if (!name || !price || !type) {
            return res.render("drink/new", {
                types,
                message: "Faltan campos requeridos",
                messageType: "error"
            });
        }

        await drinkController.create(name, description, price, type);
        res.redirect("/drink?message=Bebida creada correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        let errorMessage = "Error al crear la bebida";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DRINK_TYPE") {
            errorMessage = "Tipo de bebida no válido";
        }
        res.redirect(`/drink/new?message=${errorMessage}&messageType=error`);
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await drinkController.getById(id);
        res.render("drink/update", {
            drink,
            types,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/drink?message=Error al cargar el formulario&messageType=error");
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, type } = req.body;

        if (!name || !price || !type) {
            return res.redirect(`/drink/update/${id}?message=Faltan campos requeridos&messageType=error`);
        }

        await drinkController.update(id, name, description, price, type);
        res.redirect("/drink?message=Bebida actualizada correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar la bebida";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DRINK_TYPE") {
            errorMessage = "Tipo de bebida no válido";
        }
        res.redirect(`/drink/update/${id}?message=${errorMessage}&messageType=error`);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await drinkController.remove(id);
        res.redirect("/drink?message=Bebida eliminada correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        res.redirect("/drink?message=Error al eliminar la bebida&messageType=error");
    }
}

export const functions = {
    getAll,
    getById,
    create,
    createForm,
    update,
    updateForm,
    remove
};
export default functions;