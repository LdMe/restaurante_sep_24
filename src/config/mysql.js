import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

class Mysql {

    async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: DB_HOST,
                port: DB_PORT,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_DATABASE
            });
            console.log("conexión correcta con base de datos")
            return this.connection;
        } catch (error) {
            console.error("error de conexión", error.message);
        }
    }
    disconnect() {
        if (this.connection) {
            this.connection.end();
        }
    }
    async query(sql,params=[]) {
        const connection = await this.connect();
        try {
            const [rows, fields] = await connection.query(sql,params);
            this.disconnect();
            return rows;
        } catch (error) {
            console.error(error);
            this.disconnect();
        }
    }
}



export default Mysql;