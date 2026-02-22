import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const getCartsController = async (req, res) => {
    try {
        const cartManager = new CartsManager();

        const getCarts = await cartManager.getCarts();
        console.log(getCarts, 'getCarts');

        sendResponse(getCarts, res);
    } catch (error) {
        sendResponse(error, res);
    }
}