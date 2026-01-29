import express from 'express';
import {productsRouter} from './routes/productsRouter.js'
import { cartsRouter } from './routes/cartsRouter.js';
import { engine } from 'express-handlebars';
import { join } from 'node:path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import { realTimeProductsRoute } from './routes/realTimeProductsRouter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const app = express();

const PORT = 8080;

app.engine('hbs', engine({
    defaultLayout: 'main',
    partialsDir: join(__dirname, 'views', 'partials'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(projectRoot, 'public')));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeProducts', realTimeProductsRoute);


app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}, route: http://localhost:${PORT}`)
})