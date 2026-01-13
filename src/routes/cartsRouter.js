import express from 'express';
import { CartsManager } from '../cartsManager/CartsManager.js';

const cartsRoute = 'src/data/carts.json'

export const cartsRouter = express.Router();

cartsRouter.post('/', async (req, res) => {
    try {
        const cartManager = new CartsManager(cartsRoute)
        const data = await cartManager.createNewCart();
        res.status(201).json({message: `Se ha creado un carro nuevo con id: ${data.cid}.`})

    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params; 
        const cartManager = new CartsManager(cartsRoute)
        const data = await cartManager.getCart(cid);
        
        if(data.status === 400 || data.status === 404) {
            throw data;
        } 
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
        
        
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const productData = req.body;
        
        const productManager = new ProductManager(productRoute);

        const createProduct = await productManager.addProduct(productData);

        console.log(createProduct,'createProduct')

        if(createProduct.status === 400) {
            throw createProduct;
        }

        res.status(201).json(createProduct);




    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})

cartsRouter.put('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const data = req.body;
        if(pid.trim() === undefined) {
            res.status(400).json({message: `El id no fue enviado`, status:400});
        };

        const updatedProduct = {
            pid,
            data
        }


        const productManager = new ProductManager(productRoute);

        const updateProduct = await productManager.updateProduct(updatedProduct);

        if(updateProduct.status === 404) {
            throw updateProduct;
        }

        res.json(updateProduct);


    } catch (error) {
        console.error(error);
        res.status(error.code).json(error);
    }
})

cartsRouter.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        if(pid.trim() === undefined) {
            res.status(400).json({message: `El id no fue enviado`, status:400});
        };
        const productManager = new ProductManager(productRoute);

        const updateProduct = await productManager.deleteProduct(pid);

        if(updateProduct.status === 404) {
            throw updateProduct;
        }

        res.json(updateProduct);


    } catch (error) {
        console.error(error);
        res.status(error.code).json(error);
    }
})