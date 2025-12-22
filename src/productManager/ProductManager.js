import fs from 'node:fs/promises';

export class ProductManager {
    constructor(productsRoute) {
        this.productsRoute = productsRoute;
    };

    async addProducts(products) {
        try {
            
            
            const productsList = await this.getProducts();


        } catch (error) {
            console.error(error);
        }
    }

    async addProduct(product) {
        try {

            const isString = typeof product === 'string';
            if(isString) {
                const parseProduct = JSON.parse(product);
                const newId = crypto.randomUUID();
                const productWithId = {...parseProduct, id: newId};                    

                console.log(productWithId);
            }
            
            const productsList = await this.getProducts();



        } catch (error) {
            console.error(error);
        }

    }

    async getProducts() {
        try {
            const request = await fs.readFile(this.productsRoute, 'utf-8');

            if (request === undefined) {
                const err = new Error('El archivo no ha sido creado aún');
                err.code = 404;
                throw err;
            }

            const productsList = JSON.parse(request);

            return productsList;

        } catch (error) {
            if(error.code === 'ENOENT') {
                await fs.writeFile(this.productsRoute, '[]','utf-8');
                return [];
            }
            throw error;
        }
    }

    async getProduct(pid) {
        try {

            const productsList = await this.getProducts();

            if(productsList.length === 0) {
                const err = new Error('La lista está vacía');
                err.code = 404;
                throw err;
            }

            const id = Number(pid);
            const pidIsNAN = Number.isNaN(id);
            const pidIsNotInteger = !Number.isInteger(id); 
            console.log(pidIsNAN, 'pidIsNAN')
            console.log(pidIsNotInteger, 'pidIsNotInteger')

            console.log(id, 'id')

            if(pidIsNAN || pidIsNotInteger){
                const err = new Error('El id tiene que ser un número');
                err.code = 400;
                throw err;
            }
            
            const productFound = productsList.find(product => product.id === id);

            if(!productFound){
                
                const err = new Error(`No se ha encontrado el producto con id: ${id}`);
                err.code = 404;
                throw err
                
            }
            return productFound;
            

        } catch (error) {
            console.error(error.message);
            throw error;
            
        }
    }
}