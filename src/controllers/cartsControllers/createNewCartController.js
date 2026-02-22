import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createNewCartController = async (req, res) => {
    try {
        const cartManager = new CartsManager()
        const newCart = await cartManager.createNewCart();
        console.log(newCart,'newCart')
        sendResponse(newCart, res);

    } catch (error) {
        console.error(error);
        sendResponse(error, res);
    }
}