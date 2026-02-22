import { ProductManager } from "../../productManager/ProductManager.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { socketServer } from '../../index.js';

export const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        
        const productManager = new ProductManager();

        const createProduct = await productManager.addProduct(productData);

        console.log(createProduct, 'createProduct')

        socketServer.emit('product', {type: 'newProduct', product: {...createProduct}});

        sendResponse(createProduct, res);

    } catch (error) {
        console.error(error);
        sendResponse(error, res);
    }
}