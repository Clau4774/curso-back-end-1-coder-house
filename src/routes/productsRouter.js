import Router from 'express';

import { getProductsController } from '../controllers/productsControllers/getProductsController.js';
import { getProductByIdController } from '../controllers/productsControllers/getProductByIdController.js';
import { createProductController } from '../controllers/productsControllers/createProductController.js';
import { updateProductByIdController } from '../controllers/productsControllers/updateProductByIdController.js';
import { deleteProductController } from '../controllers/productsControllers/deleteProductController.js';

export const productsRouter = Router();



productsRouter.get('/', getProductsController);

productsRouter.get('/:pid', getProductByIdController);

productsRouter.post('/', createProductController);

productsRouter.put('/:pid', updateProductByIdController);

productsRouter.delete('/:pid', deleteProductController);