import { ProductManager } from "../../productManager/ProductManager.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const getProductsController = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const category = req.query.category || '';
        const status = req.query.status || '';
        const sort = parseInt(req.query.sort)  || 1;

        const productManager = new ProductManager()
        const data = await productManager.getProducts(limit, page, category, status, sort);
        sendResponse(data, res);

    } catch (error) {
        sendResponse(error, res);
    }
}