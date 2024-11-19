import userController from "../user/userController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";

async function register(name,last_name,email,tel,password,passwordConfirm){
    if(password != passwordConfirm){
        throw new error.PASSWORDS_DONT_MATCH();
    }
    const oldUser = await userController.getByEmail(email);
    if(oldUser){
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const newUser = await userController.create(name,last_name,email,tel,password);
    return newUser;
}

async function login(email,password){
    const user = await userController.getByEmail(email);
    if(!user){
        throw new error.USER_NOT_FOUND();
    }
    const verified = await verifyPassword(password,user.password);
    if(!verified){
        throw new error.INVALID_CREDENTIALS();
    }
    return user;
}


export default{
    register,
    login
}
