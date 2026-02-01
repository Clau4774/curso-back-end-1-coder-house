import express from 'express';
import { CartsManager } from '../cartsManager/CartsManager.js';
import { join } from 'node:path';
import { __dirname } from '../dirname/dirname.js';


const cartsRoute =  join(__dirname, '..', 'data', 'carts.json');


export const cartsRouter = express.Router();


//creates a new cart
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


//get cart by id
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


//add product to cart
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cartManager = new CartsManager(cartsRoute);

        const addToCart = await cartManager.addProductToCart(cid, pid);

        console.log(addToCart, 'addToCart')

        res.json({...addToCart})


    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})