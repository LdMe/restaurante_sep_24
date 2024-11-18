import orderController from "./orderController.js";
import localController from "../local/localController.js";
import dishController from "../dish/dishController.js";
import drinkController from "../drink/drinkController.js";
import menuController from "../menu/menuController.js";

async function getAll(req, res) {
    try {
        const orders = await orderController.getAll();
        res.render("order/list", {
            orders,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("order/list", {
            orders: [],
            message: "Error al cargar los pedidos",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const order = await orderController.getById(id);
        res.render("order/show", { order });
    } catch (error) {
        console.error(error);
        if (error.message === "ORDER_NOT_FOUND") {
            res.redirect("/order?message=Pedido no encontrado&messageType=error");
        } else {
            res.redirect("/order?message=Error al cargar el pedido&messageType=error");
        }
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
            clientId: req.session.user.client_id, // Usando session en lugar de passport
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.redirect("/order?message=Error al cargar el formulario&messageType=error");
    }
}

async function create(req, res) {
    try {
        const { localId, items } = req.body;
        const clientId = req.session.user.client_id; // Usando session en lugar de passport
        
        if (!localId || !items) {
            return res.redirect("/order/new?message=Faltan campos requeridos&messageType=error");
        }

        await orderController.create(clientId, localId, items);
        res.redirect("/order?message=Pedido creado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
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
        res.redirect(`/order/new?message=${errorMessage}&messageType=error`);
    }
}

async function getOrdersByClient(req, res) {
    try {
        const clientId = req.session.user.client_id; // Usando session en lugar de passport
        const orders = await orderController.getOrdersByClient(clientId);
        res.render("order/client-orders", {
            orders,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("order/client-orders", {
            orders: [],
            message: "Error al cargar los pedidos",
            messageType: "error"
        });
    }
}

async function getOrdersByLocal(req, res) {
    try {
        const localId = parseInt(req.params.localId);
        const orders = await orderController.getOrdersByLocal(localId);
        res.render("order/local-orders", {
            orders,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("order/local-orders", {
            orders: [],
            message: "Error al cargar los pedidos",
            messageType: "error"
        });
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await orderController.remove(id);
        res.redirect("/order?message=Pedido eliminado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        if (error.message === "ORDER_NOT_FOUND") {
            res.redirect("/order?message=Pedido no encontrado&messageType=error");
        } else {
            res.redirect("/order?message=Error al eliminar el pedido&messageType=error");
        }
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