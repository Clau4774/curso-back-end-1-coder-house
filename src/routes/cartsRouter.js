import {Router} from 'express';
import { getCartsController } from '../controllers/cartsControllers/getCartsController.js';
import { createNewCartController } from '../controllers/cartsControllers/createNewCartController.js';
import { getCartByIdController } from '../controllers/cartsControllers/getCartByIdController.js';
import { addProductToCartController } from '../controllers/cartsControllers/addProductToCartController.js';
import { deleteProductFromCartController } from '../controllers/cartsControllers/deleteProductFromCartController.js';
import { deleteAllProductsFromCartController } from '../controllers/cartsControllers/deleteAllProductsFromCartController.js';
import { updateProductQuantityController } from '../controllers/cartsControllers/updateProductQuantityController.js';

export const cartsRouter = Router();


cartsRouter.get('/', getCartsController);

//creates a new cart
cartsRouter.post('/', createNewCartController);


//get cart by id
cartsRouter.get('/:cid', getCartByIdController);


//add product to cart
cartsRouter.post('/:cid/products/:pid', addProductToCartController);

cartsRouter.delete( '/:cid/products/:pid', deleteProductFromCartController)

cartsRouter.put('/:cid', deleteAllProductsFromCartController)

cartsRouter.put('/:cid/products/:pid', updateProductQuantityController)