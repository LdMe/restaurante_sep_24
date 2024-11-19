
class LOCAL_NOT_FOUND{
    constructor(){
        super("El local no existe")
        this.status=404;
    }
}




export const errors ={
    LOCAL_NOT_FOUND,
}

export default errors;