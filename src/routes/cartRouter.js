import { Router } from "express";
import { CartsManager } from "../cartsManager/CartsManager.js";
import { sendResponse } from "../utils/sendResponse.js";


export const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cartManager = new CartsManager();
        const data = await cartManager.getCartAndPopulate(cid);

        if(!data) {
            throw data;
        }

        const {payload} = data;

        const {products} = payload;

        const productsWithTotal = products.map(product => {
            return {
                ...product,
                totalPrice: product.productId.price * product.quantity
            }
        });

        const cartTotalPrice = productsWithTotal.reduce((acc, curr) => acc += curr.totalPrice, 0);

        const fixedPrices = productsWithTotal.map(product => {
                return {
                    ...product,
                    totalPrice: product.totalPrice.toFixed(2)
                }
            })

        const cartProductsWithTotal = {
            cartProducts: [...fixedPrices],
            cartTotalPrice: cartTotalPrice.toFixed(2)
        }      

        res.render('cartView', {cartProductsWithTotal});

    } catch (error) {
        sendResponse(error, res);
    }
})