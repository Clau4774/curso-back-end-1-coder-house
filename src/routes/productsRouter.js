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
        const data = await productManager.getProduct(pid);
        console.log(data, 'data')
        res.json(data);

    } catch (error) {
        if(error.code === 404){
            console.error(error), 'error productsRouter';
            return res.json(error);
        }
        
    }
})

productsRouter.post('/', (req, res) => {
    try {
        


    } catch (error) {
        console.error(error);
    }
})