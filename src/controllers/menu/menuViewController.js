import menuController from "./menuController.js";
import dishController from "../dish/dishController.js";
import drinkController from "../drink/drinkController.js";

async function getAll(req, res) {
    try {
        const menus = await menuController.getAll();
        res.render("menu/list", {
            menus,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("menu/list", {
            menus: [],
            message: "Error al cargar los menús",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const menu = await menuController.getById(id);
        res.render("menu/show", { menu });
    } catch (error) {
        console.error(error);
        if (error.message === "MENU_NOT_FOUND") {
            res.redirect("/menu?message=Menú no encontrado&messageType=error");
        } else {
            res.redirect("/menu?message=Error al cargar el menú&messageType=error");
        }
    }
}

async function createForm(req, res) {
    try {
        const [dishes, drinks] = await Promise.all([
            dishController.getAll(),
            drinkController.getAll()
        ]);
        res.render("menu/new", {
            dishes,
            drinks,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/menu?message=Error al cargar el formulario&messageType=error");
    }
}

async function create(req, res) {
    try {
        const { name, price, dishes, drinks } = req.body;

        if (!name || !price) {
            const [allDishes, allDrinks] = await Promise.all([
                dishController.getAll(),
                drinkController.getAll()
            ]);
            return res.render("menu/new", {
                dishes: allDishes,
                drinks: allDrinks,
                message: "Faltan campos requeridos",
                messageType: "error"
            });
        }

        await menuController.create(
            name, 
            price, 
            dishes ? (Array.isArray(dishes) ? dishes : [dishes]) : [], 
            drinks ? (Array.isArray(drinks) ? drinks : [drinks]) : []
        );
        res.redirect("/menu?message=Menú creado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        let errorMessage = "Error al crear el menú";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        }
        res.redirect(`/menu/new?message=${errorMessage}&messageType=error`);
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const [menu, dishes, drinks] = await Promise.all([
            menuController.getById(id),
            dishController.getAll(),
            drinkController.getAll()
        ]);
        res.render("menu/update", {
            menu,
            dishes,
            drinks,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/menu?message=Error al cargar el formulario&messageType=error");
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, price } = req.body;

        if (!name || !price) {
            return res.redirect(`/menu/${id}/update?message=Faltan campos requeridos&messageType=error`);
        }

        await menuController.update(id, name, price);
        res.redirect("/menu?message=Menú actualizado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar el menú";
        if (error.message === "INVALID_PRICE") {
            errorMessage = "El precio debe ser mayor que 0";
        }
        res.redirect(`/menu/${id}/update?message=${errorMessage}&messageType=error`);
    }
}

async function dishesForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const [menu, allDishes] = await Promise.all([
            menuController.getById(id),
            dishController.getAll()
        ]);

        res.render("menu/dishes", {
            menu,
            allDishes,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "MENU_NOT_FOUND") {
            res.redirect("/menu?message=Menú no encontrado&messageType=error");
        } else {
            res.redirect("/menu?message=Error al cargar el formulario&messageType=error");
        }
    }
}

async function drinksForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const [menu, allDrinks] = await Promise.all([
            menuController.getById(id),
            drinkController.getAll()
        ]);

        res.render("menu/drinks", {
            menu,
            allDrinks,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "MENU_NOT_FOUND") {
            res.redirect("/menu?message=Menú no encontrado&messageType=error");
        } else {
            res.redirect("/menu?message=Error al cargar el formulario&messageType=error");
        }
    }
}

async function updateDishes(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { dishes } = req.body;

        const dishIds = dishes ? (Array.isArray(dishes) ? dishes : [dishes]) : [];
        await menuController.updateDishes(id, dishIds);
        res.redirect(`/menu/${id}?message=Platos actualizados correctamente&messageType=success`);
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        if (error.message === "MENU_NOT_FOUND") {
            res.redirect("/menu?message=Menú no encontrado&messageType=error");
        } else {
            res.redirect(`/menu/${id}/dishes?message=Error al actualizar los platos&messageType=error`);
        }
    }
}

async function updateDrinks(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { drinks } = req.body;

        const drinkIds = drinks ? (Array.isArray(drinks) ? drinks : [drinks]) : [];
        await menuController.updateDrinks(id, drinkIds);
        res.redirect(`/menu/${id}?message=Bebidas actualizadas correctamente&messageType=success`);
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        if (error.message === "MENU_NOT_FOUND") {
            res.redirect("/menu?message=Menú no encontrado&messageType=error");
        } else {
            res.redirect(`/menu/${id}/drinks?message=Error al actualizar las bebidas&messageType=error`);
        }
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await menuController.remove(id);
        res.redirect("/menu?message=Menú eliminado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        res.redirect("/menu?message=Error al eliminar el menú&messageType=error");
    }
}

export const functions = {
    getAll,
    getById,
    create,
    createForm,
    update,
    updateForm,
    dishesForm,
    drinksForm,
    updateDishes,
    updateDrinks,
    remove
};
export default functions;