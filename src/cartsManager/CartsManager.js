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

            const cidToNumber = Number(cid);
            const cidIsNumber = isNaN(cidToNumber);

            if(!cidIsNumber) {
                const err = {
                    message: `El cid es un número y debe ser un randomUUID`,
                    status: 400
                };
                throw err;
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
            //console.error(error.message);
            console.log(error, 'error CartManager')
            return error;
            
        }
    }

    async addProductToCart(cid, pid) {
        try {
            
            
        } catch (error) {
            console.log(error, 'error CartManager')
            return error;
        }
    }


}
