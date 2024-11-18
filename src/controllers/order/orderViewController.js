import orderController from "./orderController.js";
import localController from "../local/localController.js";
import dishController from "../dish/dishController.js";
import drinkController from "../drink/drinkController.js";
import menuController from "../menu/menuController.js";

async function getAll(req, res) {
    try {
        const orders = await orderController.getAll();
        res.render("order/list", { orders });
    } catch (error) {
        req.flash("error", "Error al cargar los pedidos");
        res.redirect("/");
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const order = await orderController.getById(id);
        res.render("order/show", { order });
    } catch (error) {
        if (error.message === "ORDER_NOT_FOUND") {
            req.flash("error", "Pedido no encontrado");
        } else {
            req.flash("error", "Error al cargar el pedido");
        }
        res.redirect("/order");
    }
}

async function createForm(req, res) {
    try {
        const [locals, dishes, drinks, menus] = await Promise.all([
            localController.getAll(),
            dishController.getAll(),
            drinkController.getAll(),
            menuController.getAll()
        ]);
        
        res.render("order/new", { 
            locals, 
            dishes, 
            drinks, 
            menus,
            clientId: req.user.client.client_id // Asumiendo que usas autenticación
        });
    } catch (error) {
        req.flash("error", "Error al cargar el formulario");
        res.redirect("/order");
    }
}

async function create(req, res) {
    try {
        const { localId, items } = req.body;
        const clientId = req.user.client.client_id; // Asumiendo que usas autenticación
        
        if (!localId || !items) {
            req.flash("error", "Faltan campos requeridos");
            return res.redirect("/order/new");
        }

        await orderController.create(clientId, localId, items);
        req.flash("success", "Pedido creado correctamente");
        res.redirect("/order");
    } catch (error) {
        let errorMessage = "Error al crear el pedido";
        switch (error.message) {
            case "LOCAL_NOT_FOUND":
                errorMessage = "Local no encontrado";
                break;
            case "EMPTY_ORDER":
                errorMessage = "El pedido debe contener al menos un ítem";
                break;
            case "INVALID_ITEM_TYPE":
                errorMessage = "Tipo de ítem no válido";
                break;
        }
        req.flash("error", errorMessage);
        res.redirect("/order/new");
    }
}

async function getOrdersByClient(req, res) {
    try {
        const clientId = req.user.client.client_id; // Asumiendo que usas autenticación
        const orders = await orderController.getOrdersByClient(clientId);
        res.render("order/client-orders", { orders });
    } catch (error) {
        req.flash("error", "Error al cargar los pedidos");
        res.redirect("/");
    }
}

async function getOrdersByLocal(req, res) {
    try {
        const localId = parseInt(req.params.localId);
        const orders = await orderController.getOrdersByLocal(localId);
        res.render("order/local-orders", { orders });
    } catch (error) {
        req.flash("error", "Error al cargar los pedidos");
        res.redirect("/");
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await orderController.remove(id);
        req.flash("success", "Pedido eliminado correctamente");
        res.redirect("/order");
    } catch (error) {
        if (error.message === "ORDER_NOT_FOUND") {
            req.flash("error", "Pedido no encontrado");
        } else {
            req.flash("error", "Error al eliminar el pedido");
        }
        res.redirect("/order");
    }
}

export const functions = {
    getAll,
    getById,
    create,
    createForm,
    getOrdersByClient,
    getOrdersByLocal,
    remove
};
export default functions;