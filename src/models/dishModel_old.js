import Mysql from "../config/mysql.js";

const types=[
    {
        value:"starter",
        name:"Entrante"
    },
    {
        value:"first-course",
        name:"Primer Plato"
    },
    {
        value:"second-course",
        name:"Segundo Plato"
    },
    {
        value:"dessert",
        name:"Postre"
    }

]
const mysqlInstance = new Mysql();


async function getAll() {
    const sql= "SELECT * FROM dish";
    const result = await mysqlInstance.query(sql);
    return result;
}

async function getById(dish_id) {
    const sql = "SELECT * FROM dish WHERE dish_id=?";
    const result = await mysqlInstance.query(sql,[dish_id]);
    return result[0];
}

async function create(name, description, price, type) {
    const sql = "INSERT INTO dish (name,description,price,type) VALUES(?,?,?,?)";
    const result = await mysqlInstance.query(sql,[name,description,parseInt(price),type]);
    console.log(result.insertId);
    const newDish = await getById(result.insertId); // sacamos el nuevo objeto
    return newDish;
}

async function update(dish_id, data) {
    const sql = "UPDATE dish SET name=?, description=?,price=?,type=? WHERE dish_id=?";
    const result = await mysqlInstance.query(sql,[data.name,data.description,data.price,data.type,dish_id]);

    return result;
}

async function remove(dish_id){
    const sql = "DELETE FROM dish WHERE dish_id=?";
    const result = await mysqlInstance.query(sql,[dish_id]);
    return result;
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    types
}
export default functions;