//import userModel from "../../models/userModel.js"
import userModel from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import { hashPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";


async function getAll(){
   const users = await userModel.findAll({
    include: Client
   });
   return users;
}

async function getById(id){
    const user = await userModel.findByPk(id,{
        include: Client
     });
    return user;
}

async function getByEmail(email){
    const user = await userModel.findOne({
        where: {
            email: email
        }
    })
    return user;
}

async function create(name,last_name,email,tel,password,role="client"){
    const oldUser = await getByEmail(email);
    if(oldUser){
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const hash = await hashPassword(password);
    const newUser = await userModel.create({
      name,
      last_name,
      email,
      tel,
      password:hash,
      role
    });
   return newUser;
}


async function update(id,name,last_name,email,tel,password){
    const user = await userModel.findByPk(id);
    if(!user){
        throw new error.USER_NOT_FOUND();
    }
    user.name=name;
    user.last_name=last_name;
    user.email=email;
    user.tel=tel
    if(password){
        const hash = await hashPassword(password);
        user.password=hash;
    }
    await user.save();
    return user;
}

async function remove(id){
    const userToRemove = await userModel.findByPk(id);
    if(!user){
        throw new error.USER_NOT_FOUND();
    }
    await userToRemove.destroy();
    return userToRemove;
}


export const functions = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    remove
}
export default functions;
