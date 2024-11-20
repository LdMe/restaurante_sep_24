
class ORDER_ALREADY_OPEN extends Error{
    constructor(){
        super("Ya existe un pedido abierto");
        this.status = 409;
    }
}

class ORDER_DOESNT_EXIST extends Error {
    constructor(){
        super("No existe un pedido abierto");
        this.status = 404;
    }
}


export default{
    ORDER_ALREADY_OPEN,
    ORDER_DOESNT_EXIST
}