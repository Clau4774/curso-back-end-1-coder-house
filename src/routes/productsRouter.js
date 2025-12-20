import express from 'express';
import { ProductsManager } from '../productsManager/ProductsManager.js';

const productRoute = 'src/data/products.json'

export const productsRouter = express.Router();

productsRouter.get('/', async (__, res) => {
    try {
        const productManager = new ProductsManager(productRoute)
        const data = await productManager.getProducts();
        console.log(data, 'data');
        res.json(data)

    } catch (error) {
        console.error(error)
    }
})

