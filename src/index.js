import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { Server }  from 'socket.io';
import { productsRouter } from './routes/productsRouter.js'
import { cartsRouter } from './routes/cartsRouter.js';
import { initializeSocket, realTimeProductsRoute } from './routes/realTimeProductsRouter.js';
import { __dirname } from './dirname/dirname.js';

const projectRoot = join(__dirname, '..');

const app = express();
const httpServer = createServer(app);

export const socketServer = new Server(httpServer);


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
app.use('/realTimeProducts', realTimeProductsRoute);

initializeSocket();

httpServer.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}, route: http://localhost:${PORT}`)
})
