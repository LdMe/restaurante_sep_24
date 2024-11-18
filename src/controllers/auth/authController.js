import User from "../../models/userModel.js";
import Client from "../../models/clientModel.js";
import bcrypt from "bcrypt";

async function register(name, last_name, email, tel, password, passwordConfirm) {
    // Validaciones
    if (!name || !email || !password || !passwordConfirm) {
        return { error: "Todos los campos obligatorios deben estar completos" };
    }

    if (password !== passwordConfirm) {
        return { error: "Las contraseñas no coinciden" };
    }

    try {
        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return { error: "El email ya está registrado" };
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await User.create({
            name,
            last_name,
            email,
            tel,
            password: hashedPassword,
            role: "client" // Por defecto, todos los registros son clientes
        });

        // Crear cliente asociado
        await Client.create({
            user_id: user.user_id
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Error al registrar el usuario" };
    }
}

async function login(email, password) {
    try {
        if (!email || !password) {
            return { error: "Email y contraseña son requeridos" };
        }

        // Buscar usuario con sus relaciones
        const user = await User.findOne({
            where: { email },
            include: [{ model: Client }]
        });

        if (!user) {
            return { error: "Credenciales inválidas" };
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { error: "Credenciales inválidas" };
        }

        return {
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
                client: user.client
            }
        };
    } catch (error) {
        console.error(error);
        return { error: "Error al iniciar sesión" };
    }
}

export const functions = {
    register,
    login
};

export default functions;