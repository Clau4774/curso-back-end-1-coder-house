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

        sendResponse(getCarts, res);
    } catch (error) {
        sendResponse(error, res);
    }
})

//creates a new cart
cartsRouter.post('/', async (req, res) => {
    try {
        const cartManager = new CartsManager()
        const newCart = await cartManager.createNewCart();
        console.log(newCart,'newCart')
        sendResponse(newCart, res);

    } catch (error) {
        console.error(error);
        sendResponse(error, res);
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
        sendResponse(data, res)

    } catch (error) {
        console.error(error);
        sendResponse(error, res);
        
        
    }
})


//add product to cart
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cartManager = new CartsManager();

        const addToCart = await cartManager.addProductToCart(cid, pid);

        console.log(addToCart, 'addToCart')

        sendResponse(addToCart, res)


    } catch (error) {
        console.error(error);
        sendResponse(error, res)
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

        sendResponse(deleteProduct, res);
        
    } catch (error) {
        sendResponse(error, res);
    }
})

cartsRouter.put('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cartManager = new CartsManager();
        const emptyCart = await cartManager.deleteAllProductsFromCart(cid);

        if(emptyCart.status) {
            throw emptyCart;
        }

        sendResponse(emptyCart, res)
    } catch (error) {
        console.log(error);
        sendResponse(error, res)
    }
})