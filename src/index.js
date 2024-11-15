import express from "express";
import router from "./routes/router.js";

const app = express();

app.set('views', 'src/views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json

app.get('/', (req, res) => {
    res.render('index', { title: 'Iniciosss', message: 'Bienvenido a mi página' })
});

app.use("/", router);

app.use('/public/resources', express.static(process.cwd() + '/public/resources'));





app.listen(3000, () => console.log("Estamos conectados en el puerto 3000"));