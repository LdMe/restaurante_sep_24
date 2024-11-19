import Order from "../../models/orderModel.js";
import Local from "../../models/localModel.js";
import Client from "../../models/clientModel.js";
import error from "../../helpers/errors/orderErrors.js";
async function getAll(role="client",client_id=null) {
    const filter ={}
    if(role ==="client"){
        filter.where={client_id}
    }
    const orders = await Order.findAll({
        include: [Local, Client],
        ...filter
    });
    return orders;
}

async function getById(id) {
    const order = await Order.findByPk(id, {
        include: [Local, Client]
    });
    if(!order){
        throw new error.ORDER_NOT_FOUND();
    }
    return order;
}

async function getByClientId(clientId) {
    const orders = await Order.findAll({
        where: {
            client_id: clientId
        },
        include: [Local, Client]
    });
    return orders;
}

async function create(clientId, localId) {
    const newOrder = await Order.create({
        client_id: clientId,
        local_id: localId
    });
    return newOrder;
}

async function update(orderId, localId) {
    const order = await Order.findByPk(orderId);
    if (!order) {
        throw new error.ORDER_NOT_FOUND();
    }
    order.local_id = localId;
    await order.save();
    return order;
}

async function remove(orderId) {
    const orderToRemove = await Order.findByPk(orderId);
    if (!orderToRemove) {
        throw new error.ORDER_NOT_FOUND();
    }
    await orderToRemove.destroy();
    return orderToRemove;
}

export const functions = {
    getAll,
    getById,
    getByClientId,
    create,
    update,
    remove
};

export default functions;