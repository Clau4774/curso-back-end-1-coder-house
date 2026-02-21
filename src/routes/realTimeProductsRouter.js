import { Router } from "express";
import { join } from 'node:path';
import { ProductManager } from "../productManager/ProductManager.js";
import { socketServer } from "../index.js";
import { __dirname } from "../dirname/dirname.js";


export const realTimeProductsRoute = Router();

realTimeProductsRoute.get('/', async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const category = req.query.category || null;
        const status = req.query.status || null;
        const sort = parseInt(req.query.sort)  || 1;

        const productManager = new ProductManager();
        const products = await productManager.getProducts(limit, page, category, status, sort);
        const productsWithFixedPrice = products.payload.map(product => {
            return ({
            ...product,
            _id: product._id.toString(),
            price: product.price.toFixed(2)
            })
        });
        res.render('index', {productsWithFixedPrice});
    } catch (error) {
        console.error(error)
    }
})

export function initializeSocket() {
    socketServer.on('connection',socket => {
        console.log(`Cliente conectado: ${socket.id}`);
    
        socket.on('requestProducts', async () => {
            const productManager = new ProductManager();
            const products = await productManager.getProducts();
            const productsWithFixedPrice = products.payload.map(product => ({
                ...product,
                _id: product._id.toString(),
                price: product.price.toFixed(2)
            }));
    
            socket.emit('productsList', {productsWithFixedPrice});
        })
    })
}
