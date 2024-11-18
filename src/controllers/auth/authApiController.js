import authController from "./authController.js";


async function register(req,res){
    try {
        const {name,email,last_name,tel,password,passwordConfirm}=req.body;
        const result = await authController.register(name,last_name,email,tel,password,passwordConfirm);
        if(result.error){
            return res.status(result.status).json({error:result.error});
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
}

async function login(req,res){
    try {
        const {email,password} = req.body;
        const result = await authController.login(email,password);
        if(result.error){
            return res.status(result.status).json({error:result.error});
        }
        res.json({token:result});
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }

}

export default {
    register,
    login
}