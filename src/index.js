import express from 'express';
import {productsRouter} from './routes/productsRouter.js'
import { cartsRouter } from './routes/cartsRouter.js';

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}, route: http://localhost:${PORT}`)
})