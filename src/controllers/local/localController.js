import local from "../../models/localModel.js";
import localModel from "../../models/localModel.js"


async function getAll(){
 
    const locals = await localModel.findAll()
    return locals;
}

async function getById(id){
    const local = await localModel.findByPk()
    return local;
}

async function create(name, address, phone){
    const local = await localModel.create({    
    name,
    address,
    phone
    })
    return local;
}

async function update(id,name, address, phone){
    const local = await localModel.findByPk(id);
    local.name=name;
    local.address=address;
    local.phone=phone;
    await local.save();
    return local;
}

async function remove(id){
        const localToRemove = await localModel.findByPk(id);
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
