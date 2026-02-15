import fs from 'node:fs/promises';
import { cartModel } from '../mongodb/models/cart.model.js';

export class CartsManager {
    constructor() {};

    async createNewCart() {
        try {
            const createCart = await cartModel.insertOne();

            console.log(createCart, 'createCart');

            return createCart;
            
        } catch (error) {
            return error;
        }
    }

    async getCarts() {
        try {
            const carts = await cartModel.find();

            if(!carts) {
                const error = {
                    message: `Hubo un error`,
                    status: 404
                };

                return error
            }

            return carts;

        } catch (error) {
           
    }
}

    async getCart(cid) {
        try {

            
            const checkCartId = this.checkCartId(cid);
            
            if(checkCartId.status) {
                throw checkCartId;
            }
            const cart = await cartModel.find({_id: cid});
            
            
            if (!cart) {
                const err = {
                    message: `No pudimos encontrar el carro con cid: ${cid}, por favor pruebe con un carro existente`,
                    status: 404
                };
                throw err;
            }

            return cart;
            

        } catch (error) {
            console.log(error, 'error CartManager')
            return error;
            
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const checkCartId = this.checkCartId(cid);

            console.log(cid, 'cid')

            if(checkCartId.status) {
                throw checkCartId;
            }
            
            const addProductToCart = await cartModel.findOneAndUpdate({_id: cid, 'products.productId': pid}, {
                $inc: {
                'products.$.quantity': 1                
                }
            });

            console.log(addProductToCart, 'addProductToCart');

            if(!addProductToCart) {
                return await cartModel.findByIdAndUpdate(
                    cid,
                    {
                        $push: {
                            products: {
                                productId: pid,
                                quantity: 1
                            }
                        }
                    }
                )
            }



                return addProductToCart;
            
        } catch (error) {
            console.log(error, 'error CartManager')
            return error;
        }
    }

    checkCartId(cid) {
        const cidToNumber = Number(cid);
        const cidIsNumber = isNaN(cidToNumber);

        if(!cidIsNumber) {
            const err = {
                message: `El cid es un número y debe ser un randomUUID`,
                status: 400
            };
            return err;
        }

        return false;
    }

    async deleteProductFromCart(cid, pid) {

        try {
            
            const findAndDeleteProduct = await cartModel.findOneAndUpdate({_id: cid, 'products.productId': pid}, {
                $match: [`${pid}`],
                $unset: {
                    'products.productsId': pid
                }
            });

            if(!findAndDeleteProduct) {
                const error = {
                    message: `No se encontró el documento para eliminar con id: ${pid}`,
                    status: 404
                }

                return error;
            }

            const result = {
                message: `Se ha eliminado el producto con id: ${pid} con éxito.`,
                status: 200
            }

            console.log(findAndDeleteProduct, 'findAndDeleteProduct');

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
        
    }
}
