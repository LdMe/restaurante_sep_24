import User from '../../models/userModel.js';
import Client from '../../models/clientModel.js';
import bcrypt from 'bcrypt';

async function getAll() {
    const users = await User.findAll({
        include: { model: Client }
    });
    return users;
}

async function getById(id) {
    const user = await User.findByPk(id, {
        include: { model: Client }
    });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
}

async function getByEmail(email) {
    const user = await User.findOne({
        where: { email },
        include: { model: Client }
    });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
}

async function create(name, lastName, email, tel, password, role = "client") {
    // Validar email único
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // Validar rol
    const validRoles = ["client", "staff", "admin"];
    if (!validRoles.includes(role)) {
        throw new Error("INVALID_ROLE");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
        name,
        last_name: lastName,
        email,
        tel,
        role,
        password: hashedPassword
    });

    // El trigger de la BD creará el cliente si el rol es "client"
    return getById(user.user_id);
}

async function update(id, name, lastName, email, tel, role) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Validar email único si cambia
    if (email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
    }

    // Validar rol
    const validRoles = ["client", "staff", "admin"];
    if (!validRoles.includes(role)) {
        throw new Error("INVALID_ROLE");
    }

    user.name = name;
    user.last_name = lastName;
    user.email = email;
    user.tel = tel;
    user.role = role;

    await user.save();
    return getById(user.user_id);
}

async function updatePassword(id, currentPassword, newPassword) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Verificar password actual
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        throw new Error("INVALID_PASSWORD");
    }

    // Hash y actualizar nuevo password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return true;
}

async function remove(id) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    await user.destroy();
    return user;
}

// Método de autenticación
async function authenticate(email, password) {
    const user = await User.findOne({
        where: { email },
        include: { model: Client }
    });
    
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return user;
}

export const functions = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    updatePassword,
    remove,
    authenticate
};
export default functions;