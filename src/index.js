import express from 'express';
import {productsRouter} from './routes/productsRouter.js'
import { cartsRouter } from './routes/cartsRouter.js';
import { engine } from 'express-handlebars';
import { join } from 'node:path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = 8080;

console.log(__dirname)

const viewsRoute = join('')

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: join(__dirname, 'views', 'layouts'),
    partialsDir: join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', '')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}, route: http://localhost:${PORT}`)
})