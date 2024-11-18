import Order from '../../models/orderModel.js';
import Dish from '../../models/dishModel.js';
import Drink from '../../models/drinkModel.js';
import Menu from '../../models/menuModel.js';
import Client from '../../models/clientModel.js';
import Local from '../../models/localModel.js';
import User from '../../models/userModel.js';

async function getAll() {
    const orders = await Order.findAll({
        include: [
            { 
                model: Client,
                include: {
                    model: User,
                    attributes: ['name', 'last_name', 'email']
                }
            },
            { model: Local },
            { model: Dish },
            { model: Drink },
            { model: Menu }
        ]
    });
    return orders;
}

async function getById(id) {
    const order = await Order.findByPk(id, {
        include: [
            { 
                model: Client,
                include: {
                    model: User,
                    attributes: ['name', 'last_name', 'email']
                }
            },
            { model: Local },
            { 
                model: Dish,
                through: { attributes: ['quantity'] }
            },
            { 
                model: Drink,
                through: { attributes: ['quantity'] }
            },
            { 
                model: Menu,
                through: { attributes: ['quantity'] }
            }
        ]
    });
    if (!order) {
        throw new Error("ORDER_NOT_FOUND");
    }
    return order;
}

async function create(clientId, localId, items) {
    // Validar existencia del cliente y local
    const [client, local] = await Promise.all([
        Client.findByPk(clientId),
        Local.findByPk(localId)
    ]);

    if (!client) throw new Error("CLIENT_NOT_FOUND");
    if (!local) throw new Error("LOCAL_NOT_FOUND");
    if (!items || !items.length) throw new Error("EMPTY_ORDER");

    // Crear orden
    const order = await Order.create({
        client_id: clientId,
        local_id: localId
    });

    // Procesar items del pedido
    for (const item of items) {
        switch (item.type) {
            case 'dish':
                await order.addDish(item.id, { 
                    through: { quantity: item.quantity || 1 }
                });
                break;
            case 'drink':
                await order.addDrink(item.id, { 
                    through: { quantity: item.quantity || 1 }
                });
                break;
            case 'menu':
                await order.addMenu(item.id, { 
                    through: { quantity: item.quantity || 1 }
                });
                break;
            default:
                throw new Error("INVALID_ITEM_TYPE");
        }
    }

    return getById(order.order_id);
}

async function getOrdersByClient(clientId) {
    const orders = await Order.findAll({
        where: { client_id: clientId },
        include: [
            { model: Local },
            { model: Dish },
            { model: Drink },
            { model: Menu }
        ]
    });
    return orders;
}

async function getOrdersByLocal(localId) {
    const orders = await Order.findAll({
        where: { local_id: localId },
        include: [
            { 
                model: Client,
                include: {
                    model: User,
                    attributes: ['name', 'last_name', 'email']
                }
            },
            { model: Dish },
            { model: Drink },
            { model: Menu }
        ]
    });
    return orders;
}

async function remove(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("ORDER_NOT_FOUND");
    await order.destroy();
    return order;
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