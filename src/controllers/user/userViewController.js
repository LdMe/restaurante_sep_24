import userController from "./userController.js";

async function getAll(req, res) {
    try {
        const users = await userController.getAll();
        res.render("user/list", {
            users,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        res.render("user/list", {
            users: [],
            message: "Error al cargar los usuarios",
            messageType: "error"
        });
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.getById(id);
        res.render("user/show", { user });
    } catch (error) {
        console.error(error);
        if (error.message === "USER_NOT_FOUND") {
            res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else {
            res.redirect("/user?message=Error al cargar el usuario&messageType=error");
        }
    }
}

async function createForm(req, res) {
    res.render("user/new", {
        roles: ["client", "staff", "admin"],
        message: req.query.message,
        messageType: req.query.messageType
    });
}

async function create(req, res) {
    try {
        const { name, lastName, email, tel, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.redirect("/user/new?message=Faltan campos requeridos&messageType=error");
        }

        await userController.create(name, lastName, email, tel, password, role);
        res.redirect("/user?message=Usuario creado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        let errorMessage = "Error al crear el usuario";
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            errorMessage = "El email ya está en uso";
        } else if (error.message === "INVALID_ROLE") {
            errorMessage = "Rol no válido";
        }
        res.redirect(`/user/new?message=${errorMessage}&messageType=error`);
    }
}

async function updateForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.getById(id);
        res.render("user/update", {
            user,
            roles: ["client", "staff", "admin"],
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "USER_NOT_FOUND") {
            res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else {
            res.redirect("/user?message=Error al cargar el formulario&messageType=error");
        }
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, lastName, email, tel, role } = req.body;
        
        if (!name || !email) {
            return res.redirect(`/user/${id}/update?message=Faltan campos requeridos&messageType=error`);
        }

        await userController.update(id, name, lastName, email, tel, role);
        res.redirect("/user?message=Usuario actualizado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar el usuario";
        if (error.message === "USER_NOT_FOUND") {
            return res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else if (error.message === "EMAIL_ALREADY_EXISTS") {
            errorMessage = "El email ya está en uso";
        } else if (error.message === "INVALID_ROLE") {
            errorMessage = "Rol no válido";
        }
        res.redirect(`/user/${id}/update?message=${errorMessage}&messageType=error`);
    }
}

async function updatePasswordForm(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await userController.getById(id);
        res.render("user/update-password", {
            user,
            message: req.query.message,
            messageType: req.query.messageType
        });
    } catch (error) {
        console.error(error);
        if (error.message === "USER_NOT_FOUND") {
            res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else {
            res.redirect("/user?message=Error al cargar el formulario&messageType=error");
        }
    }
}

async function updatePassword(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.redirect(`/user/${id}/update-password?message=Faltan campos requeridos&messageType=error`);
        }

        await userController.updatePassword(id, currentPassword, newPassword);
        res.redirect("/user?message=Contraseña actualizada correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        const id = parseInt(req.params.id);
        let errorMessage = "Error al actualizar la contraseña";
        if (error.message === "USER_NOT_FOUND") {
            return res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else if (error.message === "INVALID_PASSWORD") {
            errorMessage = "La contraseña actual no es correcta";
        }
        res.redirect(`/user/${id}/update-password?message=${errorMessage}&messageType=error`);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        await userController.remove(id);
        res.redirect("/user?message=Usuario eliminado correctamente&messageType=success");
    } catch (error) {
        console.error(error);
        if (error.message === "USER_NOT_FOUND") {
            res.redirect("/user?message=Usuario no encontrado&messageType=error");
        } else {
            res.redirect("/user?message=Error al eliminar el usuario&messageType=error");
        }
    }
}

export const functions = {
    getAll,
    getById,
    create,
    createForm,
    update,
    updateForm,
    updatePassword,
    updatePasswordForm,
    remove
};
export default functions;