import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import swaggerDoc from "./openapi.json" with { type: "json" };
import cors from "cors";
const app = express();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(function (req, res, next) {
    res.locals.user = req.session.user || null;
    next();
 });// middleware para sacar informacion de sesion en vistas
 
app.set('views', 'src/views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json

app.use("/", router);

app.use('/public/resources', express.static(process.cwd() + '/public/resources'));





app.listen(3000, () => console.log("Estamos conectados en el puerto 3000"));