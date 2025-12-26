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

            console.log(product, 'product addProduct')
            const productDataOk = this.checkProductData(product);

            if(productDataOk.message || product.code) throw productDataOk;

            const productsList = await this.getProducts();

            const findProduct = productsList.find(productInList = productInList.code === product.code);

            if(findProduct) {
                const err = {
                    message: `Ya hay un producto cargado con el código ${product.code}`,
                    code: 400
                }

                throw err;
            }

            const parseProduct = JSON.parse(product);

            const createProductWithId = {...parseProduct, id: crypto.randomUUID()};

            const productListUpdated = [...productsList, createProductWithId];

            const productListStringified = JSON.stringify(productListUpdated);

            const writingFile = await fs.writeFile(this.productsRoute, productListStringified, 'utf-8');

            console.log(writingFile, 'writingFile');

            res.status(201).json({message: `producto con código ${product.code} creado satisfactoriamente.`, code: 201});


        } catch (error) {
            console.error(error);
            return error;
        }

    }

    async getProducts() {
        try {
            const request = await fs.readFile(this.productsRoute, 'utf-8');

            if (request === undefined) {
                const err = {
                    message: 'El archivo no ha sido creado aún',
                    code: 404
                }
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
                const err = {
                    message: `La lista de productos está vacía.`,
                    code: 404
                }
                throw err;
            }

            const id = Number(pid);
            const pidIsNAN = Number.isNaN(id);
            const pidIsNotInteger = !Number.isInteger(id); 

            if(pidIsNAN || pidIsNotInteger){
                // const err = {
                //     message: `El id "${pid}" tiene que ser un número`,
                //     code: 400
                // }

                // throw err
                const err = {
                    message: `El id "${pid}" tiene que ser un número entero`,
                    code: 400
                };
                throw err;
            }
            
            const productFound = productsList.find(product => product.id === id);

            console.log(productFound)

            if(!productFound){
                
                const err = {
                    message: `No se ha encontrado el producto con id "${id}", por favor pruebe con otro`,
                    code: 404
                }
                throw err
                
            }
            return productFound;
            

        } catch (error) {
            //console.error(error.message);
            console.log(error, 'error productManager')
            return error;
            
        }
    }

    checkProductData(product) {
        const {title, description, code, price, status, stock, category} = product;
        const errorHandler = (error) => {
            return {message: error.message, code: error.code }
        }

        if (title.trim() === '' ) {
            const error = {
                message: 'El title está vació, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (isNaN(Number(title))) {
            const error = {
                message: 'El title no tiene que ser solo un números',
                code: 400
            }

            return errorHandler(error)
        }
        if (description.trim() === '' ) {
            const error = {
                message: 'La descripción está vacía, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (isNaN(Number(description))) {
            const error = {
                message: 'La descripción no tiene que ser solo un números',
                code: 400
            }

            return errorHandler(error)
        }
        
        if (code.trim() === '' ) {
            const error = {
                message: 'El campo código está vacío, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (isNaN(Number(code))) {
            const error = {
                message: 'El código no debe ser solo números',
                code: 400
            }

            return errorHandler(error)
        }

        if (price.trim() === '' ) {
            const error = {
                message: 'El precio está vacío, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(price))) {
            const error = {
                message: 'Debe ingresar números únicamente en este campo',
                code: 400
            }

            return errorHandler(error);
        }

        if (status.trim() === '' ) {
            const error = {
                message: 'El status está vacío, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(status))) {
            const error = {
                message: 'Debe elegir una opción válida',
                code: 400
            }

            return errorHandler(error);
        }

        if (typeof status === 'boolean') {
            const error = {
                message: 'Debe ingresar un valor booleano',
                code: 400
            }

            return errorHandler(error);
        }

        
        if (stock.trim() === '' ) {
            const error = {
                message: 'El campo está vacío, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (isNaN(Number(status))) {
            const error = {
                message: 'Debe ingresar números en este campo',
                code: 400
            }

            return errorHandler(error);
        }

        
        if (category.trim() === '' ) {
            const error = {
                message: 'El campo category está vacío, complete esté campo',
                code: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(category))) {
            const error = {
                message: 'No debe ingresar solo números en este campo',
                code: 400
            }

            return errorHandler(error);
        }

        return null;
        
    }
}