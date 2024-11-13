import Mysql from "../src/config/mysql.js";

async function testDatabase() {
    const mysqlInstance = new Mysql();
    const connection = await mysqlInstance.connect();
    const sql = 'SELECT * FROM dish';
    try {
        const [rows, fields] = await connection.query(sql);
        console.log(rows);
        mysqlInstance.disconnect();
    } catch (error) {
        console.error(error);
        mysqlInstance.disconnect();
    }
}

testDatabase();