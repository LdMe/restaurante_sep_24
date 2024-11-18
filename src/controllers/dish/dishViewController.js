// controllers/dish/dishViewController.js
import dishController from "./dishController.js";
import ingredientController from "../ingredient/ingredientController.js";
import { dishTypeLabels } from "../../helpers/dishHelpers.js";

const types = Object.entries(dishTypeLabels).map(([value, name]) => ({ value, name }));

async function getAll(req, res) {
    try {
        const dishes = await dishController.getAll();
        res.render("dish/list", {
            dishes,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("dish/list", {
            dishes: [],
            message: "Error al cargar los platos",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const dish = await dishController.getById(id);
        res.render("dish/show", { dish });
    } catch (error) {
        console.error(error);
        if (error.message === "DISH_NOT_FOUND") {
            res.redirect("/dish?message=Plato no encontrado&messageType=error");
        } else {
            res.redirect("/dish?message=Error al cargar el plato&messageType=error");
        }
    }
}

async function createForm(req, res) {
    try {
        const ingredients = await ingredientController.getAll();
        res.render("dish/new", {
            types,
            ingredients,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/dish?message=Error al cargar el formulario&messageType=error");
    }
}

async function create(req, res) {
    try {
        const { name, description, price, type, ingredients } = req.body;

        if (!name || !price || !type) {
            return res.render("dish/new", {
                types,
                ingredients: await ingredientController.getAll(),
                message: "Faltan campos requeridos",
                messageType: "error"
            });
        }

        await dishController.create(name, description, price, type, ingredients);
        res.redirect("/dish?message=Plato creado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        console.error(error);
        let errorMessage = "Error al crear el plato";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DISH_TYPE") {
            errorMessage = "Tipo de plato no válido";
        }
        res.redirect(`/dish/new?message=${errorMessage}&messageType=error`);
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const [dish, ingredients] = await Promise.all([
            dishController.getById(id),
            ingredientController.getAll()
        ]);
        res.render("dish/update", {
            dish,
            types,
            ingredients,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/dish?message=Error al cargar el formulario&messageType=error");
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, type } = req.body;

        if (!name || !price || !type) {
            return res.redirect(`/dish/update/${id}?message=Faltan campos requeridos&messageType=error`);
        }

        await dishController.update(id, name, description, price, type);
        res.redirect("/dish?message=Plato actualizado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar el plato";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        } else if (error.message === "INVALID_DISH_TYPE") {
            errorMessage = "Tipo de plato no válido";
        }
        res.redirect(`/dish/update/${id}?message=${errorMessage}&messageType=error`);
    }
}
async function ingredientsForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const [dish, allIngredients] = await Promise.all([
            dishController.getById(id),
            ingredientController.getAll()
        ]);

        res.render("dish/ingredients", {
            dish,
            allIngredients,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "DISH_NOT_FOUND") {
            res.redirect("/dish?message=Plato no encontrado&messageType=error");
        } else {
            res.redirect("/dish?message=Error al cargar el formulario&messageType=error");
        }
    }
}
async function updateIngredients(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { ingredients } = req.body;

        // Si no se selecciona ningún ingrediente, ingredients será undefined
        // Lo convertimos a un array vacío para evitar errores
        const ingredientIds = ingredients ?(Array.isArray(ingredients) ? ingredients : [ingredients]) :[];
        await dishController.updateIngredients(id, ingredientIds);
        res.redirect(`/dish/${id}?message=Ingredientes actualizados correctamente&messageType=success`);
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        if (error.message === "DISH_NOT_FOUND") {
            res.redirect("/dish?message=Plato no encontrado&messageType=error");
        } else {
            res.redirect(`/dish/${id}/ingredients?message=Error al actualizar los ingredientes&messageType=error`);
        }
    }
}
async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await dishController.remove(id);
        res.redirect("/dish?message=Plato eliminado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        res.redirect("/dish?message=Error al eliminar el plato&messageType=error");
    }
}

export const functions = {
    getAll,
    getById,
    create,
    createForm,
    update,
    updateForm,
    ingredientsForm,
    updateIngredients,
    remove
};
export default functions;