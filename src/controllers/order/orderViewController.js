import orderController from "./orderController.js";

async function getAll(req,res){
    try {
        let id = null;
        const user =req.session.user;
        if(user?.role ==="client"){
            id=user.client_id;
        }
        const orders = await orderController.getAll(id);
        res.render("order/list",{orders});
    } catch (error) {
        console.error(error);
        res.json(error)
    }
}

async function addDish(req,res){
    try{
        const {dish_id,quantity} = req.body;
        const client_id = req.session.user.client_id;
        const order = await orderController.addDish(client_id,parseInt(dish_id),parseInt(quantity));
        res.redirect("/dish");
    }
    catch(error){
        console.error(error)
    } 
}
async function removeDish(req,res){
    try{
        const {dish_id} = req.body;
        const client_id = req.session.user.client_id;
        const order = await orderController.setDishQuantity(client_id,parseInt(dish_id),0);
        res.redirect("/order");
    }
    catch(error){
        console.error(error)
    } 
}

async function setDishQuantity(req,res){
    try{
        const {dish_id,quantity} = req.body;
        const client_id = req.session.user.client_id;
        const order = await orderController.setDishQuantity(client_id,parseInt(dish_id),parseInt(quantity));
        res.redirect("/order");
    }
    catch(error){
        console.error(error)
    }
    
}
async function close(req,res){
    try {
        const client_id = req.session.user.client_id;
        await orderController.closeOrder(client_id)
        res.redirect("/order");
    } catch (error) {
     console.error(error);   
    }
}

export const functions ={
    getAll,
    addDish,
    setDishQuantity,
    close,
    removeDish
}

export default functions;