import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import * as relations from "./models/relations.js";

import { formatPrice, formatPriceWithCurrency } from './helpers/priceHelpers.js';
import { getDishTypeLabel } from './helpers/dishHelpers.js';
import { getDrinkTypeLabel } from './helpers/drinkHelpers.js';
import {calculateOrderTotal, calculateItemsSubtotal} from './helpers/orderHelpers.js';


const app = express();

// Configurar helpers globales para las vistas
app.locals.formatPrice = formatPrice;
app.locals.formatPriceWithCurrency = formatPriceWithCurrency;
app.locals.getDishTypeLabel = getDishTypeLabel;
app.locals.getDrinkTypeLabel = getDrinkTypeLabel;
app.locals.calculateOrderTotal = calculateOrderTotal;
app.locals.calculateItemsSubtotal = calculateItemsSubtotal;

app.use(session({
    secret: 'tu_clave_secreta_aqui', // Deberías mover esto a variables de entorno
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true en producción
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middleware para hacer el usuario disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

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