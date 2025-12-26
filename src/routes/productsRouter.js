import express from 'express';
import { ProductManager } from '../productManager/ProductManager.js';

const productRoute = 'src/data/products.json'

export const productsRouter = express.Router();

productsRouter.get('/', async (__, res) => {
    try {
        const productManager = new ProductManager(productRoute)
        const data = await productManager.getProducts();
        console.log(typeof true, 'typeof true')
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
        
        if(data.code === 400 || data.code === 404) {
            throw data;
        } 
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(error.code).json(error);
        
        
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const productData = req.body;
        console.log(productData, 'productData');
        //console.log(productData, 'productData');

        const productManager = new ProductManager(productRoute);

        const createProduct = await productManager.addProduct(productData);




    } catch (error) {
        console.error(error);
    }
})