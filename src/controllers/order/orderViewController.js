import orderController from "./orderController.js"

async function getAll(req,res){
    try{
        const userRole = req.session.user.role;
        const clientId = req.session.user.client_id;
        const orders = await orderController.getAll(userRole,clientId);
        res.json(orders);
    }catch(error){
        console.error(error)
        res.json(error.message)
    }

}
