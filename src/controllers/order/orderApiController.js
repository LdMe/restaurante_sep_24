import orderController from "./orderController.js";

async function getAll(req, res) {
    try {
        const orders = await orderController.getAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const order = await orderController.getById(id);
        res.json(order);
    } catch (error) {
        if (error.message === "ORDER_NOT_FOUND") {
            res.status(404).json({ error: "Order not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function create(req, res) {
    try {
        const { clientId, localId, items } = req.body;
        
        if (!clientId || !localId || !items) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const order = await orderController.create(clientId, localId, items);
        res.status(201).json(order);
    } catch (error) {
        switch (error.message) {
            case "CLIENT_NOT_FOUND":
                res.status(404).json({ error: "Client not found" });
                break;
            case "LOCAL_NOT_FOUND":
                res.status(404).json({ error: "Local not found" });
                break;
            case "EMPTY_ORDER":
                res.status(400).json({ error: "Order must contain items" });
                break;
            case "INVALID_ITEM_TYPE":
                res.status(400).json({ error: "Invalid item type" });
                break;
            default:
                res.status(500).json({ error: "Internal server error" });
        }
    }
}

async function getOrdersByClient(req, res) {
    try {
        const clientId = parseInt(req.params.clientId);
        const orders = await orderController.getOrdersByClient(clientId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getOrdersByLocal(req, res) {
    try {
        const localId = parseInt(req.params.localId);
        const orders = await orderController.getOrdersByLocal(localId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await orderController.remove(id);
        res.status(204).end();
    } catch (error) {
        if (error.message === "ORDER_NOT_FOUND") {
            res.status(404).json({ error: "Order not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const functions = {
    getAll,
    getById,
    create,
    getOrdersByClient,
    getOrdersByLocal,
    remove
};
export default functions;