import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const deleteProductFromCartController = async (req, res) => {
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
}