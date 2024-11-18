import authController from "./authController.js";

function loginForm(req,res){
    const error = req.query.error;
    res.render("auth/login",{error:error});
}
function registerForm(req,res){
    const error = req.query.error;
    res.render("auth/register",{error:error});
}
async function register(req,res){
    try {
        const {name,email,last_name,tel,password,passwordConfirm}=req.body;
        const result = await authController.register(name,last_name,email,tel,password,passwordConfirm);
        if(result.error){
            return res.redirect("/register?error=" + result.error);
        }
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.redirect("/register?error=Internal Server Error");
    }
}

async function login(req,res){
    try {
        const {email,password} = req.body;
        const result = await authController.login(email,password);
        if(result.error){
            return res.redirect("/login?error=" + result.error);
        }
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.redirect("/login?error=Internal Server Error");
    }

}

export default {
    register,
    login,
    registerForm,
    loginForm
}