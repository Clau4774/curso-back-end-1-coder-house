import { ProductManager } from "../../productManager/ProductManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const getProductByIdController = async (req, res) => {
    try {
        const {pid} = req.params; 
        const productManager = new ProductManager()
        const data = await productManager.getProduct(pid);
        
        sendResponse(data, res);

    } catch (error) {
        console.error(error);
        sendResponse(error, res)
    }
}