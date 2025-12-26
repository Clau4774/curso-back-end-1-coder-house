import express from 'express';
import { CartsManager } from '../cartsManager/CartsManager.js';

const cartsRoute = 'src/data/carts.json'

export const cartsRouter = express.Router();

// productsRouter.get('/:', async (__, res) => {
//     try {
//         const productManager = new ProductManager(productRoute)
//         const data = await productManager.getProducts();
//         console.log(typeof true, 'typeof true')
//         res.json(data);

//     } catch (error) {
//         console.error(error)
//     }
// })

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const {pid} = req.params; 
        const productManager = new CartsManager(cartsRoute)
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

productsRouter.delete('/:pid', async (req, res) => {
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