import fs from 'node:fs/promises';

export class CartsManager {
    constructor(cartsPath) {
        this.cartsPath = cartsPath;
    };

    async createNewCart() {
        try {
            const newCart = {
                cid: crypto.randomUUID(),
                products: []
            }

            const cartsList = await this.getCarts();
            const updatedCartsList = [...cartsList, newCart];

            await fs.writeFile(this.cartsPath, JSON.stringify(updatedCartsList, null, 2), 'utf-8');

            return newCart;
            
        } catch (error) {
            return error;
        }
    }

    async getCarts() {
        try {
            const request = await fs.readFile(this.cartsPath, 'utf-8');

            if (request === undefined) {
                const err = {
                    message: 'El archivo no ha sido creado aún',
                    status: 404
                }
                throw err;
            }

            const cartsList = JSON.parse(request);

            return cartsList;

        } catch (error) {
            if(error.code === 'ENOENT') {
                await fs.writeFile(this.cartsPath, '[]','utf-8');
                return [];
            }
            return error;
        }
    }

    async getCart(cid) {
        try {

            const checkCartId = this.checkCartId(cid);

            if(checkCartId.status) {
                throw checkCartId;
            }
            
            const cartsList = await this.getCarts();
            const findCart = cartsList.find(cart => cart.cid === cid);

            if (!findCart) {
                const err = {
                    message: `No pudimos encontrar el carro con cid: ${cid}, por favor pruebe con un carro existente`,
                    status: 404
                };
                throw err;
            }

            return findCart;
            

        } catch (error) {
            console.log(error, 'error CartManager')
            return error;
            
        }
    }

    async addProductToCart(cid, pid) {
        try {

            const checkCartId = this.checkCartId(cid);

            if(checkCartId.status) {
                throw checkCartId;
            }
            
            const getCart = await this.getCart(cid);
            const getCarts = await this.getCarts();

            const productInCart = getCart.products.find(product => product.pid === pid);

            console.log(productInCart, 'productInCart')

            if(!productInCart) {
                const updatedCart = {...getCart, products: [...getCart.products, { pid, quantity: 1 }]};
                const updatedCartsList = getCarts.map(cart => cart.cid === getCart.cid ? cart.products = updatedCart : cart);
                
                await fs.writeFile(this.cartsPath, JSON.stringify(updatedCartsList, null, 2));

                const successMessage = {
                    message: `Se ha actualizado el carro con cid ${cid}, y se ha agregado el producto con id ${pid}`,
                    cart: updatedCart,
                    status: 200
                }
                return successMessage;
            }

            const updatedCart = {cid, products: getCart.products.map(product => product.pid === pid ? {pid, quantity: product.quantity + 1} : product)};
            console.log(updatedCart, 'updatedCart')
            
            const updatedCartsList = getCarts.map(cart => cart.cid === getCart.cid ? updatedCart : cart);
            await fs.writeFile(this.cartsPath, JSON.stringify(updatedCartsList, null, 2));
            
            const successMessage = {
                    message: `Se ha actualizado el carro con cid ${cid}, y se ha agregado el producto con id ${pid}`,
                    cart: updatedCart,
                    status: 200
                }

                return successMessage;
            
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

}
