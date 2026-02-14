import { Router } from "express";
import { join } from 'node:path';
import { ProductManager } from "../productManager/ProductManager.js";
import { socketServer } from "../index.js";
import { __dirname } from "../dirname/dirname.js";


export const realTimeProductsRoute = Router();
const productsRoute = join(__dirname, '..' ,'data', 'products.json')

realTimeProductsRoute.get('/', async (req, res) => {
    try {
        const productManager = new ProductManager();
            const products = await productManager.getProducts();
            const productsWithFixedPrice = products.payload.map(product => {
                console.log(product._id.toString(), 'dentro de fixed')
                return ({
                ...product,
                _id: product._id.toString(),
                price: product.price.toFixed(2)
            })
        });

        //console.log(productsWithFixedPrice, 'productsWithFixedPrice')
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
