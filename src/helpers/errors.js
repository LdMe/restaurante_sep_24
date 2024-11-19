
class USER_NOT_FOUND extends Error {
    constructor(){
        super("Usuario no encontrado");
        this.status=404;
    }
}

class USER_ALREADY_EXISTS extends Error {
    constructor(){
        super("El usuario ya existe");
        this.status=409;
    }
}

class EMAIL_ALREADY_EXISTS extends Error {
    constructor(){
        super("El email ya está en uso");
        this.status=409;
    }
}
class INVALID_CREDENTIALS extends Error{
    constructor(){
        super("Credenciales inválidas");
        this.status=400;
    }
}

class PASSWORDS_DONT_MATCH extends Error{
    constructor(){
        super("Las contraseñas no coinciden");
        this.status=400;
    }
}

export const errors ={
    USER_NOT_FOUND,
    USER_ALREADY_EXISTS,
    EMAIL_ALREADY_EXISTS,
    INVALID_CREDENTIALS,
    PASSWORDS_DONT_MATCH
}

export default errors;