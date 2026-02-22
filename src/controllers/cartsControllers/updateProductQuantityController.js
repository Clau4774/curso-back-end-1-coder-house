import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const updateProductQuantityController = async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const quantity = req.body.quantity || 1;
        const cartManager = new CartsManager();
        const updateQuantity = await cartManager.sumProductsToCart(cid, pid, quantity)

        sendResponse(updateQuantity, res);
    } catch (error) {
        console.log(error);
        sendResponse(error, res);
    }
}