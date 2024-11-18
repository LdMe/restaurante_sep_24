import ingredientController from "./ingredientController.js";

async function getAll(req, res) {
    try {
        const ingredients = await ingredientController.getAll();
        res.render("ingredient/list", {
            ingredients,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("ingredient/list", {
            ingredients: [],
            message: "Error al cargar los ingredientes",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const ingredient = await ingredientController.getById(id);
        res.render("ingredient/show", { ingredient });
    } catch (error) {
        console.error(error);
        if (error.message === "INGREDIENT_NOT_FOUND") {
            res.redirect("/ingredient?message=Ingrediente no encontrado&messageType=error");
        } else {
            res.redirect("/ingredient?message=Error al cargar el ingrediente&messageType=error");
        }
    }
}

async function createForm(req, res) {
    res.render("ingredient/new", {
        message: req.query.message,
        messageType: req.query.messageType
    });
}

async function create(req, res) {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.render("ingredient/new", {
                message: "El nombre es requerido",
                messageType: "error"
            });
        }

        await ingredientController.create(name);
        res.redirect("/ingredient?message=Ingrediente creado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        let errorMessage = "Error al crear el ingrediente";
        if (error.message === "INGREDIENT_ALREADY_EXISTS") {
            errorMessage = "Ya existe un ingrediente con ese nombre";
        }
        res.redirect(`/ingredient/new?message=${errorMessage}&messageType=error`);
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const ingredient = await ingredientController.getById(id);
        res.render("ingredient/update", {
            ingredient,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "INGREDIENT_NOT_FOUND") {
            res.redirect("/ingredient?message=Ingrediente no encontrado&messageType=error");
        } else {
            res.redirect("/ingredient?message=Error al cargar el formulario&messageType=error");
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        
        if (!name) {
            return res.redirect(`/ingredient/${id}/update?message=El nombre es requerido&messageType=error`);
        }

        await ingredientController.update(id, name);
        res.redirect("/ingredient?message=Ingrediente actualizado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar el ingrediente";
        if (error.message === "INGREDIENT_NOT_FOUND") {
            return res.redirect("/ingredient?message=Ingrediente no encontrado&messageType=error");
        } else if (error.message === "INGREDIENT_ALREADY_EXISTS") {
            errorMessage = "Ya existe un ingrediente con ese nombre";
        }
        res.redirect(`/ingredient/${id}/update?message=${errorMessage}&messageType=error`);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await ingredientController.remove(id);
        res.redirect("/ingredient?message=Ingrediente eliminado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        if (error.message === "INGREDIENT_NOT_FOUND") {
            res.redirect("/ingredient?message=Ingrediente no encontrado&messageType=error");
        } else {
            res.redirect("/ingredient?message=Error al eliminar el ingrediente&messageType=error");
        }
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