import express from 'express';
import { CartsManager } from '../cartsManager/CartsManager.js';
import {sendResponse} from '../utils/sendResponse.js'
import { cartModel } from '../mongodb/models/cart.model.js';

export const cartsRouter = express.Router();


cartsRouter.get('/', async (req, res) => {
    try {
        const cartManager = new CartsManager();

        const getCarts = await cartManager.getCarts();
        console.log(getCarts, 'getCarts');

        res.json(getCarts);
    } catch (error) {
        res.status(error.status).json(error);
    }
})

//creates a new cart
cartsRouter.post('/', async (req, res) => {
    try {
        const cartManager = new CartsManager()
        const newCart = await cartManager.createNewCart();
        console.log(newCart,'newCart')
        res.status(201).json({message: `Se ha creado un carro nuevo con id: ${newCart._id.toString()}.`})

    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})


//get cart by id
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params; 
        const cartManager = new CartsManager()
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
        const cartManager = new CartsManager();

        const addToCart = await cartManager.addProductToCart(cid, pid);

        console.log(addToCart, 'addToCart')

        res.json({...addToCart})


    } catch (error) {
        console.error(error);
        res.status(error.status).json(error);
    }
})

cartsRouter.delete( '/:cid/products/:pid', async (req, res) => {
    try {
        const { cid , pid } = req.params;

        const cartManager = new CartsManager();

        const deleteProduct = await cartManager.deleteProductFromCart(cid, pid);

        if(!deleteProduct) {
            throw deleteProduct;
        }

        res.status(deleteProduct.status).json(deleteProduct);
        
    } catch (error) {
        res.status(error.status).json(error);
    }
})