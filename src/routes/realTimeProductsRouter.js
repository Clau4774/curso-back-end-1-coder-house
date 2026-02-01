import { Router } from "express";
import { join } from 'node:path';
import { ProductManager } from "../productManager/ProductManager.js";
import { socketServer } from "../index.js";
import { __dirname } from "../dirname/dirname.js";


export const realTimeProductsRoute = Router();
const productsRoute = join(__dirname, '..' ,'data', 'products.json')

realTimeProductsRoute.get('/', async (req, res) => {
    try {
        const productManager = new ProductManager(productsRoute);
            const products = await productManager.getProducts();
            const productsWithFixedPrice = products.map(product => ({
                ...product,
                price: product.price.toFixed(2)
            }));
        res.render('index', {productsWithFixedPrice});
    } catch (error) {
        
    }
})

export function initializeSocket() {
    socketServer.on('connection',socket => {
        console.log(`Cliente conectado: ${socket.id}`);
    
        socket.on('requestProducts', async () => {
            const productManager = new ProductManager(productsRoute);
            const products = await productManager.getProducts();
            const productsWithFixedPrice = products.map(product => ({
                ...product,
                price: product.price.toFixed(2)
            }));
    
            socket.emit('productsList', {productsWithFixedPrice});
        })
    })
}
