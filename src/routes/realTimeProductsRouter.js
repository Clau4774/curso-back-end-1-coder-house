import { Router } from "express";
import { join } from 'node:path';
import { ProductManager } from "../productManager/ProductManager.js";
import { socketServer } from "../index.js";
import { __dirname } from "../dirname/dirname.js";
import { realTimeProductController } from "../controllers/productsControllers/realTimeProductController.js";


export const realTimeProductsRoute = Router();

realTimeProductsRoute.get('/', realTimeProductController)

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
