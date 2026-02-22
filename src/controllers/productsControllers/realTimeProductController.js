import { ProductManager } from "../../productManager/ProductManager.js";

export const realTimeProductController = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const category = req.query.category || null;
        const status = req.query.status || null;
        const sort = parseInt(req.query.sort)  || 1;

        const productManager = new ProductManager();
        const products = await productManager.getProducts(limit, page, category, status, sort);
        const productsWithFixedPrice = products.payload.map(product => {
            return ({
            ...product,
            _id: product._id.toString(),
            price: product.price.toFixed(2)
            })
        });
        res.render('index', {productsWithFixedPrice});
    } catch (error) {
        console.error(error)
    }
}