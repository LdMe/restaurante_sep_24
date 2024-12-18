import authController from "./authController.js";

async function register(req, res) {
    try {
        const { name, email, last_name, tel, password, passwordConfirm } = req.body;
        const result = await authController.register(name, last_name, email, tel, password, passwordConfirm);
        res.redirect("/login?message=usuario registrado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const url=`/register?message=${error.message}&messageType=error`
        res.redirect(url);
    }
}

function loginForm(req,res){
    const {message,messageType}=req.query;
    res.render("auth/login",{message,messageType})
}

function registerForm(req,res){
    const {message,messageType}=req.query;
    res.render("auth/register",{message,messageType});
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);
        req.session.user={
            email:user.email,
            user_id:user.user_id,
            client_id:user.client?.client_id,
            role:user.role
        }
        const url=(`/?message=sesión iniciada correctamente&messageType=success`)
        res.redirect(url);
    } catch (error) {
        console.error(error);
        const url=`/login?message=${error.message}&messageType=error`
        res.redirect(url);
    }

}
function logout(req,res){
    req.session.user =null;
    res.redirect("/");
}
export default {
    register,
    login,
    logout,
    loginForm,
    registerForm
}