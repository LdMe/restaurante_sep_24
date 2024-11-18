// controllers/auth/authViewController.js
import authController from "./authController.js";

function loginForm(req, res) {
    res.render("auth/login", {
        message: req.query.message,
        messageType: req.query.messageType
    });
}

function registerForm(req, res) {
    res.render("auth/register", {
        message: req.query.message,
        messageType: req.query.messageType
    });
}

async function register(req, res) {
    try {
        const { name, email, last_name, tel, password, passwordConfirm } = req.body;
        const result = await authController.register(name, last_name, email, tel, password, passwordConfirm);
        
        if (result.error) {
            return res.redirect(`/register?message=${result.error}&messageType=error`);
        }
        
        res.redirect("/login?message=Registro exitoso. Por favor, inicia sesión&messageType=success");
    } catch (error) {
        console.error(error);
        res.redirect("/register?message=Error interno del servidor&messageType=error");
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authController.login(email, password);
        
        if (result.error) {
            return res.redirect(`/login?message=${result.error}&messageType=error`);
        }

        // Guardar usuario en sesión
        req.session.user = {
            user_id: result.user.user_id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
            client_id: result.user.client ? result.user.client.client_id : null
        };
        
        res.redirect("/?message=Has iniciado sesión correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        res.redirect("/login?message=Error interno del servidor&messageType=error");
    }
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/?message=Error al cerrar sesión&messageType=error');
        }
        res.redirect('/login?message=Has cerrado sesión correctamente&messageType=success');
    });
}

export const functions = {
    register,
    login,
    logout,
    registerForm,
    loginForm
};

export default functions;