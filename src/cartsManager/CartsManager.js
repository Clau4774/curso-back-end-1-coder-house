import fs from 'node:fs/promises';

export class CartsManager {
    constructor(cartsPath) {
        this.cartsPath = cartsPath;
    };

    async createNewCart(cid, arr) {
        
    }

    async addProductToCart(product) {
        try {

            console.log(product, 'product addProduct')
            const productDataOk = this.checkProductData(product);

            if(productDataOk?.message || productDataOk?.code) throw productDataOk;

            const productsList = await this.getProducts();

            const findProduct = productsList.find(productInList => productInList.code === product.code);

            if(findProduct) {
                const err = {
                    message: `Ya hay un producto cargado con el código ${product.code}`,
                    status: 400
                }

                throw err;
            }

            const createProductWithId = {...product, id: crypto.randomUUID()};

            const productListUpdated = [...productsList, createProductWithId];

            const productListStringified = JSON.stringify(productListUpdated, null ,1);

            const writingFile = await fs.writeFile(this.productsRoute, productListStringified, 'utf-8');

            console.log(writingFile, 'writingFile');

            const successMessage = {
                message: `producto con código ${product.code} creado satisfactoriamente.`, status: 201,
                product: createProductWithId
            };

            return successMessage;


        } catch (error) {
            console.error(error);
            return error;
        }

    }

    async getCarts() {
        try {
            const request = await fs.readFile(this.productsRoute, 'utf-8');

            if (request === undefined) {
                const err = {
                    message: 'El archivo no ha sido creado aún',
                    status: 404
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
            return error;
        }
    }

    async getCart(pid) {
        try {

            
            const productsList = await this.getProducts();

            if(productsList.length === 0) {
                const err = {
                    message: `La lista de productos está vacía.`,
                    code: 404
                }
                throw err;
            }

            // const id = Number(pid);
            // const pidIsNAN = Number.isNaN(id);
            // const pidIsNotInteger = !Number.isInteger(id); 
            
            const productFound = productsList.find(product => product.id == pid);

            console.log(productFound, 'productFound, getProduct')

            if(!productFound){
                
                const err = {
                    message: `No se ha encontrado el producto con id "${pid}", por favor pruebe con otro`,
                    status: 404
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

    async updateProduct(updatedProduct) {
        try {

            const {pid, data} = updatedProduct;
            
            const pidIsEmpty = pid.trim() === '' || undefined;

            if(pidIsEmpty) {
                const err = {
                    message: `El pid enviado está vació`,
                    status: 400
                }

                throw err
            }

            const productsList = await this.getProducts();

            const findProduct = await this.getProduct(pid);

            
            if(!findProduct) {
                
                const err = {
                    message: `Producto no encontrado con el id: ${pid}`,
                    status: 404
                }

                throw err;
            }

            
            const updateProduct = {...findProduct, ...data};

            console.log(updateProduct, "updateProduct")

            const updatedProductsLists = productsList.map(productToUpdate => {
                if(productToUpdate.id === Number(pid)) return updateProduct;
                return productToUpdate;
            });

            const stringifiedProductsList = JSON.stringify(updatedProductsLists, null, 1)

            await fs.writeFile(this.productsRoute, stringifiedProductsList);

            const productUpdateMessage = {
                message: `Producto con id: ${pid}, ha sido modificado con éxito`,
                status: 200,
                updateProduct
            }

            return productUpdateMessage;


        } catch (error) {
        
            console.error(error);
            return error;

        }
    }

    async deleteProduct(pid) {
        try {
            const pidIsEmpty = pid.trim() === '';

            if(pidIsEmpty) {
                const err = {
                    message: 'Debe ingresar un id',
                    status: 400
                };

                throw err;
            }

            const productsList = await this.getProducts();
            const findProduct = await this.getProduct(pid);

            if(!findProduct) {
                const err = {
                    message: `No se ha encontrado producto con id: ${pid}`,
                    status: 404
                }

                throw err;
            }

            const deleteProduct = productsList.filter(product => product.id != pid);

            const stringifiedProductsList = JSON.stringify(deleteProduct, null, 1);

            await fs.writeFile(this.productsRoute, stringifiedProductsList, 'utf8');

            const operationSuccess = {
                message: `Producto con id: ${pid} eliminado con éxito`,
                status: 200,
                deletedProduct: findProduct
            }

            return operationSuccess;

        } catch (error) {
            console.error(error);
            return error;
        }
    }


    checkProductData(product) {
        const {title, description, code, price, status, stock, category} = product;
        const errorHandler = (error) => {
            return {message: error.message, status: error.status }
        }

        if (title.trim() === '' ) {
            const error = {
                message: 'El title está vació, complete esté campo',
                status: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(title))) {
            const error = {
                message: 'El title no tiene que ser solo un números',
                status: 400
            }

            return errorHandler(error)
        }
        if (description.trim() === '' ) {
            const error = {
                message: 'La descripción está vacía, complete esté campo',
                status: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(description))) {
            const error = {
                message: 'La descripción no tiene que ser solo un números',
                status: 400
            }

            return errorHandler(error)
        }
        
        if (code.trim() === '' ) {
            const error = {
                message: 'El campo código está vacío, complete esté campo',
                status: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(code))) {
            const error = {
                message: 'El código no debe ser solo números',
                status: 400
            }

            return errorHandler(error)
        }

        if (isNaN(Number(price))) {
            const error = {
                message: 'Debe ingresar números únicamente en este campo',
                status: 400
            }

            return errorHandler(error);
        }

        if (typeof status !== 'boolean') {
            const error = {
                message: 'Debe ingresar un valor booleano',
                status: 400
            }

            return errorHandler(error);
        }

        if (isNaN(Number(status))) {
            const error = {
                message: 'Debe ingresar números en este campo',
                status: 400
            }

            return errorHandler(error);
        }

        
        if (category.trim() === '' ) {
            const error = {
                message: 'El campo category está vacío, complete esté campo',
                status: 400
            }

            return errorHandler(error)
        }

        if (!isNaN(Number(category))) {
            const error = {
                message: 'No debe ingresar solo números en este campo',
                status: 400
            }

            return errorHandler(error);
        }

        return null;
        
    }
}