import userController from "../user/userController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import jwt from '../../config/jwt.js';

async function register(name,last_name,email,tel,password,passwordConfirm){
    if(password != passwordConfirm){
        return {error:"Passwords don't match",status:400};
    }
    const oldUser = await userController.getByEmail(email);
    if(oldUser){
        return {error:"User with that email already exists",status:400};

    }
    const newUser = await userController.create(name,last_name,email,tel,password);
    return newUser;
}

async function login(email,password){
    const user = await userController.getByEmail(email);
    if(!user){
        return {error:"User doesn't exist",status:404};
    }
    const verified = await verifyPassword(password,user.password);
    if(!verified){
        return {error:"Incorrect credentials",status:401};
    }
    const token = jwt.sign({user_id:user.user_id,role:user.role});
    return token;
}


export default{
    register,
    login
}
