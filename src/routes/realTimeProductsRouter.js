import { Router } from "express";
import { join } from 'node:path';
import { ProductManager } from "../productManager/ProductManager.js";

export const realTimeProductsRoute = Router();
const productsRoute = join('src', 'data', 'products.json');

realTimeProductsRoute.get('/', async (req, res) => {
    const productManager = new ProductManager(productsRoute);

    const products = await productManager.getProducts();
    const productsWithFixedPrice = products.map(product => {
        const fixedProduct = {...product, price: product.price.toFixed(2)}
        return fixedProduct
    })

    console.log(products, 'products')
    res.render('index', {productsWithFixedPrice});
})

