import { ProductModel } from '../mongodb/models/product.model.js'

export class ProductManager {
    constructor() {};

    async addProduct(product) {
        try {
            const productDataOk = this.checkProductData(product);

            if(productDataOk?.message || productDataOk?.status) throw productDataOk;

            const addOneProduct = await ProductModel.insertOne(product);

            return {
                payload: addOneProduct,
                status: 201
            };


        } catch (error) {
            console.error(error);
            return {
               message: error,
               status: 404
            };
        }

    }

    async getProducts(limit, page, category = '', status = '', sort = 1) {
        try {

            const numberLimit = Number(limit)

            const skip = (page - 1) * numberLimit;

            let matchStage;

            if(category && status) {
                matchStage = { $match: { category: { $regex: category, $options: 'i' }, status: { $regex: status, $options: 'i'} } };
            };

            if(!category && status) {
                matchStage = { $match: {  status: { $regex: status, $options: 'i'} } };
            };
        
            if(category && !status) {
                matchStage = { $match: {  category: { $regex: category, $options: 'i'} } };
            };

            if(!category && !status) {
                matchStage = {$match: {}};
            }


            const allProducts = await ProductModel.aggregate([
                matchStage,
                {
                    $sort: {price: sort}
                },
                {
                    $skip: skip
                },
                {
                    $limit: numberLimit
                }

            ]);

            const totalProducts = await ProductModel.countDocuments(
            category ? { title: { $regex: category, $options: 'i' } } : {}
            );

            const totalPages = Math.ceil(totalProducts / limit);

            const hasNextPage = (totalPages - page) > 0 ? true : false ;
            const hasPreviousPage = (page - 1 ) > 0 ? true : false ;

            const result = {
                status: 200,
                payload: allProducts,
                pagination: {
                totalProducts,
                totalPages,
                currentPage: page,
                hasNextPage,
                hasPreviousPage,
                limit
                }
            }

            console.log(result)

            return result;

        } catch (error) {
            const err = {
                status: 404,
                payload: error
            }
            console.log(error)
            return err;
        }
    }

    async getProduct(pid) {
        try {
            const findProduct = await ProductModel.findOne({_id: pid});
            
        
            if(!findProduct){
                
                const err = {
                    error: {
                        message: `No se ha encontrado el producto con id "${pid}", por favor pruebe con otro`
                    },
                    status: 404
                }
                throw err
                
            }

            return {
                status: 200,
                payload: findProduct
            };
            

        } catch (error) {
            if(error.name === 'CastError') {
                return {
                    status: 400,
                    error: {
                        message: `Id "${pid}" inválido.`
                    }
                }
            }
            return {
                status: 500,
                error: {
                    message: 'Error al consultar el producto',
                    details: error.message
                }
            };
            
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

                throw err;
            }

            const updateProduct = await ProductModel.findByIdAndUpdate(pid,
                data,
                {runValidators: true}
            )
            

            const productUpdateMessage = {
                message: `Producto con id: ${pid}, ha sido modificado con éxito`,
                status: 200,
                payload: updateProduct
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

            // if(!findProduct) {
            //     const err = {
            //         message: `No se ha encontrado producto con id: ${pid}`,
            //         status: 404
            //     }

            //     throw err;
            // }

            const deleteProduct = await ProductModel.deleteOne({_id: pid});

            // const operationSuccess = {
            //     message: `Producto con id: ${pid} eliminado con éxito`,
            //     status: 200,
            //     deletedProduct: findProduct
            // }

            return {
                payload: deleteProduct,
                status: 200 
            };

        } catch (error) {
            console.error(error);
            return {
               message: error,
               status: 404
            };
        }
    }


    checkProductData(product) {
        const {title, code, price, status, category, description} = product;
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
        // if (description.trim() === '' ) {
        //     const error = {
        //         message: 'La descripción está vacía, complete esté campo',
        //         status: 400
        //     }

        //     return errorHandler(error)
        // }

        // if (!isNaN(Number(description))) {
        //     const error = {
        //         message: 'La descripción no tiene que ser solo un números',
        //         status: 400
        //     }

        //     return errorHandler(error)
        // }
        
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

        const booleanStatus = Boolean(status)

        if (typeof booleanStatus !== 'boolean') {
            const error = {
                message: 'Debe ingresar un valor booleano',
                status: 400
            }

            return errorHandler(error);
        }

        // if (isNaN(Number(booleanStatus))) {
        //     const error = {
        //         message: 'Debe ingresar números en este campo',
        //         status: 400
        //     }

        //     return errorHandler(error);
        // }

        
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

        if(!description.trim()) {
            const error = {
                message: 'Debe agregar una descripción al producto',
                status: 400
            }

            return errorHandler(error);
        }

        return null;
        
    }
}