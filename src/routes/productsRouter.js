import Router from 'express';
import { ProductManager } from '../productManager/ProductManager.js';
import { socketServer } from '../index.js';
import { sendResponse } from '../utils/sendResponse.js';

export const productsRouter = Router();



productsRouter.get('/', async (__, res) => {
    try {
        const productManager = new ProductManager()
        const data = await productManager.getProducts();
        sendResponse(data, res);

    } catch (error) {
        sendResponse(error, res);
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params; 
        const productManager = new ProductManager()
        const data = await productManager.getProduct(pid);
        
        sendResponse(data, res);

    } catch (error) {
        console.error(error);
        sendResponse(error, res)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const productData = req.body;
        
        const productManager = new ProductManager();

        const createProduct = await productManager.addProduct(productData);

        socketServer.emit('product', {type: 'newProduct', product: {...createProduct}});

        res.status(201).json(createProduct);

    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})

productsRouter.put('/:pid', async (req, res) => {
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


        const productManager = new ProductManager();

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

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        if(pid.trim() === undefined) {
            res.status(400).json({message: `El id no fue enviado`, status:400});
        };
        const productManager = new ProductManager();

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