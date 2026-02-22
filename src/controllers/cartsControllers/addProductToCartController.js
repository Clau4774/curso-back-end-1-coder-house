import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const addProductToCartController = async (req, res) => {
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
}