import express from "express";
import router from "./routes/router.js";
import session from "express-session";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.set('views', 'src/views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json

app.use("/", router);

app.use('/public/resources', express.static(process.cwd() + '/public/resources'));





app.listen(3000, () => console.log("Estamos conectados en el puerto 3000"));