import fs from 'node:fs/promises';

export class ProductsManager {
    constructor(productsRoute) {
        this.productsRoute = productsRoute;
    };

   async getProducts() {
        try {
            const request = await fs.readFile(this.productsRoute, 'utf-8');

            if (request === undefined) throw new Error('El archivo no ha sido creado aún');

            console.log(request, 'request PM')


            return request;

        } catch (error) {
            console.log(error.code)
            if(error.code === 'ENOENT') {
                await fs.writeFile(this.productsRoute, '[]','utf-8');

            }
            console.error(error)
        }
    }
}