import { ProductManager } from "../../productManager/ProductManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const deleteProductController = async (req, res) => {
    try {
        const {pid} = req.params;
        if(pid.trim() === undefined) {
            res.status(400).json({message: `El id no fue enviado`, status:400});
        };
        const productManager = new ProductManager();

        const updateProduct = await productManager.deleteProduct(pid);

        sendResponse(updateProduct, res)

        


    } catch (error) {
        console.error(error);
        sendResponse(error, res);
    }
}