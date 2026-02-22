import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const deleteAllProductsFromCartController = async (req, res) => {
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
}