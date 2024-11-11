import express from "express";
import router from "./routes/router.js";


/* const usuarios = [
    {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan.perez@example.com",
        contraseña: "contraseña123"
    },
    {
        id: 2,
        nombre: "María Gómez",
        email: "maria.gomez@example.com",
        contraseña: "segura456"
    },
    {
        id: 3,
        nombre: "Carlos Ruiz",
        email: "carlos.ruiz@example.com",
        contraseña: "clave789"
    },
    {
        id: 4,
        nombre: "Ana Torres",
        email: "ana.torres@example.com",
        contraseña: "pass101112"
    },
    {
        id: 5,
        nombre: "Luis García",
        email: "luis.garcia@example.com",
        contraseña: "miClave2020"
    }
]; */

const app = express();

app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json

app.use("/",router);





app.listen(3000, () => console.log("Estamos conectados en el puerto 3000"));