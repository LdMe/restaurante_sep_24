import Order from "../../models/orderModel.js";
import Dish from "../../models/dishModel.js";
import error from "../../helpers/errors/orderErrors.js";

async function getAll(client_id=null){
    const options ={
        include: Dish,
        order:[["created_at","DESC"]]
    };
    if(client_id){
        options.where ={client_id:client_id};
    }
    const orders = await Order.findAll(options);
    return orders;
}

async function getOpenOrderByClient(client_id){
    const order = await Order.findOne({where:{client_id:client_id,status:"open"},include:Dish})
    return order;
}

async function getOrCreateOpenOrderByClient(client_id){
    let order = await getOpenOrderByClient(client_id);
    if(!order){
        order = await create(client_id);
    }
    return order;
}

async function create(client_id){
    const openOrder = await getOpenOrderByClient(client_id);
    if(openOrder){
        throw new error.ORDER_ALREADY_OPEN();
    }
    const local_id = 1;
    const newOrder = await Order.create({client_id,local_id});
    return newOrder;
}

async function addDish(client_id,dish_id,quantity){
    const order = await getOrCreateOpenOrderByClient(client_id);
    const dish = order.dishes?.find(d =>d.dish_id===dish_id);
    let totalQuantity = quantity;
    if(dish){
        totalQuantity += dish.order_has_dish.quantity;
    }
    if(totalQuantity <= 0){
        await order.removeDish(dish_id);
    }else{
        await order.addDish(dish_id,{through:{quantity:totalQuantity}});
    }
    return order;
}

async function setDishQuantity(client_id,dish_id,quantity){
    const order = await getOrCreateOpenOrderByClient(client_id);
    if(quantity <= 0){
        await order.removeDish(dish_id);
    }else{
        await order.addDish(dish_id,{through:{quantity:quantity}});
    }
    return order;
}

async function closeOrder(client_id){
    const order = await getOpenOrderByClient(client_id);
    if(!order){
        throw new error.ORDER_DOESNT_EXIST();
    }
    order.status="closed";
    await order.save();
    return order;
}




export const functions ={
    getAll,
    create,
    addDish,
    setDishQuantity,
    closeOrder
}

export default functions;
