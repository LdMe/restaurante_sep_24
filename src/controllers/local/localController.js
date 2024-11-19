
import Local from "../../models/localModel.js"
import error from "../../helpers/errors/localErrors.js";

async function getAll(){
    const locals = await Local.findAll()
    return locals;
}

async function getById(id){
    const local = await Local.findByPk()
    if(!local) throw new error.LOCAL_NOT_FOUND();
    return local;
}

async function create(name, address, phone){
    const local = await Local.create({    
    name,
    address,
    phone
    })
    return local;
}

async function update(id, name, address, phone){
        const local = await Local.findByPk(id); 
        if(!local) throw new error.LOCAL_NOT_FOUND();   
        local.name= name,
        local.address= address,
        local.phone = phone
        await local.save()
       
        return local;
}

async function remove(id){
        const localToRemove = await Local.findByPk(id);
        if(!localToRemove) throw new error.LOCAL_NOT_FOUND();
        await localToRemove.destroy();
        return localToRemove;

}

export const functions = {

        getAll,
        getById,
        create,
        update,
        remove
}

export default functions
