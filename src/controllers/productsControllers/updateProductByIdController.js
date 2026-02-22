import { ProductManager } from "../../productManager/ProductManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const updateProductByIdController = async (req, res) => {
    try {
        const {pid} = req.params;
        const data = req.body;
        if(pid.trim() === undefined) {
            throw  {message: `El id no fue enviado`, status:400};
        };

        const updatedProduct = {
            pid,
            data
        }


        const productManager = new ProductManager();

        const updateProduct = await productManager.updateProduct(updatedProduct);

        if(updateProduct.status === 404) {
            throw updateProduct;
        }

        sendResponse(updateProduct, res)

    } catch (error) {
        console.error(error);
        sendResponse(error, res)
    }
}