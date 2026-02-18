import { Router } from "express";
import { CartsManager } from "../cartsManager/CartsManager.js";
import { sendResponse } from "../utils/sendResponse.js";


export const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        console.log(cid, 'cid')
        const cartManager = new CartsManager();
        const data = await cartManager.getCartAndPopulate(cid);

        if(!data) {
            throw data;
        }

        const {payload} = data;

        const {products} = payload;

        console.log(products, 'products')
        

        res.render('cartView', {products});

    } catch (error) {
        sendResponse(error, res);
    }
})