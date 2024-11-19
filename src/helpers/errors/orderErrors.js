class ORDER_NOT_FOUND extends Error{
    constructor(){
        super("Pedido no encontrado");
    }
}



export {
    ORDER_NOT_FOUND
}