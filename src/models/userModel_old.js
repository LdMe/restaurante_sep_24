const users = [
    {
        user_id: 1,
        name: "Ana",
        last_name: "García Martínez",
        email: "ana.garcia@gmail.com",
        tel: "+34611222333",
        role: "admin"
    },
    {
        user_id: 2,
        name: "Carlos",
        last_name: "Rodríguez López",
        email: "carlos.rodriguez@hotmail.com",
        tel: "+34622333444",
        role: "staff"
    },
    {
        user_id: 3,
        name: "María",
        last_name: "Fernández Sánchez",
        email: "maria.fernandez@yahoo.es",
        tel: "+34633444555",
        role: "staff"
    },
    {
        user_id: 4,
        name: "Juan",
        last_name: "Pérez Gómez",
        email: "juan.perez@outlook.com",
        tel: "+34644555666",
        role: "client"
    },
    {
        user_id: 5,
        name: "Laura",
        last_name: "Martín Jiménez",
        email: "laura.martin@gmail.com",
        tel: "+34655666777",
        role: "client"
    },
    {
        user_id: 6,
        name: "David",
        last_name: "González Ruiz",
        email: "david.gonzalez@gmail.com",
        tel: "+34666777888",
        role: "client"
    },
    {
        user_id: 7,
        name: "Carmen",
        last_name: "Sánchez Torres",
        email: "carmen.sanchez@hotmail.com",
        tel: "+34677888999",
        role: "staff"
    },
    {
        user_id: 8,
        name: "Miguel",
        last_name: "López García",
        email: "miguel.lopez@yahoo.es",
        tel: "+34688999000",
        role: "client"
    },
    {
        user_id: 9,
        name: "Isabel",
        last_name: "Díaz Moreno",
        email: "isabel.diaz@gmail.com",
        tel: "+34699000111",
        role: "client"
    },
    {
        user_id: 10,
        name: "Roberto",
        last_name: "Muñoz Vargas",
        email: "roberto.munoz@outlook.com",
        tel: "+34600111222",
        role: "admin"
    },
    {
        user_id: 11,
        name: "Elena",
        last_name: "Romero Navarro",
        email: "elena.romero@gmail.com",
        tel: "+34611333444",
        role: "client"
    },
    {
        user_id: 12,
        name: "Pablo",
        last_name: "Torres Serrano",
        email: "pablo.torres@hotmail.com",
        tel: "+34622444555",
        role: "staff"
    },
    {
        user_id: 13,
        name: "Lucía",
        last_name: "Herrera Castro",
        email: "lucia.herrera@yahoo.es",
        tel: "+34633555666",
        role: "client"
    },
    {
        user_id: 14,
        name: "Javier",
        last_name: "Ortiz Medina",
        email: "javier.ortiz@gmail.com",
        tel: "+34644666777",
        role: "client"
    },
    {
        user_id: 15,
        name: "Sofía",
        last_name: "Morales Vega",
        email: "sofia.morales@outlook.com",
        tel: "+34655777888",
        role: "client"
    }
];


let LAST_ID = users.length;

function getAll() {
    return users;
}

function getById(user_id) {
    const user = users.find(element => element.user_id === user_id);
    return user;
}

function create(name, last_name,email,tel,role) {
    const newUser = {
        user_id: ++LAST_ID,
        name,
        last_name,
        email,
        tel,
        role
    }
    users.push(newUser);
    return newUser;
}

function update(user_id, data) {
    const user = getById(user_id);
    const updatedUser = { ...user, ...data };
    const index = users.findIndex(element => element.user_id === user_id);
    users.splice(index, 1, updatedUser);
    return updatedUser;
}

function remove(user_id) {
    const index = users.findIndex(element => element.user_id === user_id);
    const removedElement = users.splice(index, 1);
    return removedElement;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;