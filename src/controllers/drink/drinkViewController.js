import drinkController from "./drinkController.js";

const types = [
    { value: "juice", name: "Zumo" },
    { value: "water", name: "Agua" },
    { value: "alcoholic", name: "Bebida alcohólica" },
    { value: "infusion", name: "Infusión" },
    { value: "soft-drink", name: "Refresco" }
];

async function getAll(req, res) {
    try {
        const drinks = await drinkController.getAll();
        res.render("drink/list", { drinks });
    } catch (error) {
        req.flash("error", "Error al cargar las bebidas");
        res.redirect("/");
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await drinkController.getById(id);
        res.render("drink/show", { drink });
    } catch (error) {
        if (error.message === "DRINK_NOT_FOUND") {
            req.flash("error", "Bebida no encontrada");
        } else {
            req.flash("error", "Error al cargar la bebida");
        }
        res.redirect("/drink");
    }
}

async function createForm(req, res) {
    res.render("drink/new", { types });
}

async function create(req, res) {
    try {
        const { name, description, price, type } = req.body;
        
        if (!name || !price || !type) {
            req.flash("error", "Faltan campos requeridos");
            return res.redirect("/drink/new");
        }

        await drinkController.create(name, description, price, type);
        req.flash("success", "Bebida creada correctamente");
        res.redirect("/drink");
    } catch (error) {
        let errorMessage = "Error al crear la bebida";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DRINK_TYPE") {
            errorMessage = "Tipo de bebida no válido";
        }
        req.flash("error", errorMessage);
        res.redirect("/drink/new");
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const drink = await drinkController.getById(id);
        res.render("drink/update", { drink, types });
    } catch (error) {
        if (error.message === "DRINK_NOT_FOUND") {
            req.flash("error", "Bebida no encontrada");
        } else {
            req.flash("error", "Error al cargar el formulario");
        }
        res.redirect("/drink");
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, type } = req.body;
        
        if (!name || !price || !type) {
            req.flash("error", "Faltan campos requeridos");
            return res.redirect(`/drink/update/${id}`);
        }

        await drinkController.update(id, name, description, price, type);
        req.flash("success", "Bebida actualizada correctamente");
        res.redirect("/drink");
    } catch (error) {
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar la bebida";
        if (error.message === "DRINK_NOT_FOUND") {
            return res.redirect("/drink");
        } else if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DRINK_TYPE") {
            errorMessage = "Tipo de bebida no válido";
        }
        req.flash("error", errorMessage);
        res.redirect(`/drink/update/${id}`);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await drinkController.remove(id);
        req.flash("success", "Bebida eliminada correctamente");
        res.redirect("/drink");
    } catch (error) {
        if (error.message === "DRINK_NOT_FOUND") {
            req.flash("error", "Bebida no encontrada");
        } else {
            req.flash("error", "Error al eliminar la bebida");
        }
        res.redirect("/drink");
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
