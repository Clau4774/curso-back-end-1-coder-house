import { CartsManager } from "../../cartsManager/CartsManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const getCartByIdController = async (req, res) => {
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
}