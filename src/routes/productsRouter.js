import express from 'express';
import { ProductManager } from '../productManager/ProductManager.js';

const productRoute = 'src/data/products.json'

export const productsRouter = express.Router();

productsRouter.get('/', async (__, res) => {
    try {
        const productManager = new ProductManager(productRoute)
        const data = await productManager.getProducts();
        res.json(data);

    } catch (error) {
        console.error(error)
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params; 
        const productManager = new ProductManager(productRoute)
        console.log('router acá')
        const data = await productManager.getProduct(pid);
        if(data.code) {
            throw data;
        } 
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(error.code).json(error);
        
        
    }
})

productsRouter.post('/', (req, res) => {
    try {
        


    } catch (error) {
        console.error(error);
    }
})