import fs from 'node:fs/promises';
import { cartModel } from '../mongodb/models/cart.model.js';

export class CartsManager {
    constructor() {};

    async createNewCart() {
        try {
            const createCart = await cartModel.insertOne();

            console.log(createCart, 'createCart');

            const result = {
                payload: createCart,
                status: 201
            }

            return result;
            
        } catch (error) {
            const err = {
                error: `Hubo un error en la creación del carro`,
                status: 404
            }
            return err;
        }
    }

    async getCarts() {
        try {
            const carts = await cartModel.find();

            if(!carts) {
                const error = {
                    error: `Hubo un error`,
                    status: 404
                };

                return error
            }

            return {
                payload: carts,
                status: 200
            };

        } catch (error) {
           return {
            error: error,
            status: 404
           }
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

            return {
                payload: cart,
                status: 200
            }
            

        } catch (error) {
            console.log(error)
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

            if(!addProductToCart) {
                const addProduct = await cartModel.findByIdAndUpdate(
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

                const result = {
                    payload: addProduct,
                    status: 201
                }

                return result;
            }
                return {
                    payload: addProductToCart,
                    status: 200
                };
            
        } catch (error) {
            console.log(error, 'error CartManager')
            return {
                error: error,
                status: 404
            };
        }
    }

    async sumProductsToCart(cid, pid, quantity) {
        try {

            const checkCartId = this.checkCartId(cid);

            if(checkCartId.status) {
                throw checkCartId;
            }            

            const updateProductsQuantity = await cartModel.findOneAndUpdate({_id: cid, 'products.productId': pid}, {
                $inc: {
                    'products.$.quantity': quantity
                }
            })

            if(!updateProductsQuantity) {
                const err = {
                    status: 404,
                    message: "No se pudo actualizar el producto, hubo un error"
                }

                throw err;
            }

            return {
                status: 200,
                message: `Se ha actualizado el producto con id: ${pid}`
            }

        } catch (error) {
            console.error;
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
            
            const findAndDeleteProduct = await cartModel.findByIdAndUpdate(cid, {
                
                $pull: {
                    'products': {productId: pid}
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
                payload: findAndDeleteProduct,
                status: 200
            }

            console.log(findAndDeleteProduct, 'findAndDeleteProduct');

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
        
    }

    async deleteAllProductsFromCart(cid) {
        try {
            const deleteProducts = await cartModel.findByIdAndUpdate(cid, {
                $set: {products: []}
            });

            if(!deleteProducts) {
                const err = {
                    message: 'Algo salió mal',
                    status: 500
                }

                throw err;
            }

            return {
                status: 200,
                payload: deleteProducts
            }
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
