const form = document.querySelector('#product-form');
export const productContainer = document.querySelector('#products-container');

productContainer.addEventListener('click', async e => {
    const deleteButton = e.target.dataset.productId !== undefined;

    if(deleteButton) {
        try { 
            const parentNode = e.target.parentNode;
            const productId = e.target.dataset.productId;
            console.log(productId)

            const deleteProduct = await fetch(`http://localhost:8080/api/products/${productId}`, {
                method: 'DELETE',
            })

            console.log(deleteProduct);
            
            parentNode.remove();   
        } catch (error) {
            console.log(error);
        }
    }
})

function checkFormValues(formValues) {
    
    const handleError = (error) => {
        return {
            message: error.message,
            status: error.status
        }
    }
    
    const {title, code, price, status, category, stock, description} = formValues;

    if(!title.trim()) {
        const error = {
            message: 'Debe ingresar un título',
            status: 400
        }
        return handleError(error);
    }
    
    if(!code.trim()) {
        const error = {
            message: 'Debe ingresar un código',
            status: 400
        }
        return handleError(error);
    }

    if(!price.trim()) {
        const error = {
            message: 'Debe ingresar un valor en el campo price',
            status: 400
        }
        return handleError(error);
    }

    const priceIsNan = isNaN(Number(price));

    if(priceIsNan) {
        const error = {
            message: 'El precio tiene que ser un número',
            status: 400
        }
        return handleError(error);
    }

    const statusIsBoolean = Boolean(status);

    if(typeof statusIsBoolean !== 'boolean') {
        const error = {
            message: 'Debe ingresar un valor booleano',
            status: 400
        }
        return handleError(error);
    }

    if(!category.trim()) {
        const error = {
            message: 'Debe ingresar una categoría',
            status: 400
        }
        return handleError(error);
    }

    if(!stock.trim()) {
        const error = {
            message: 'Debe completar el campo stock',
            status: 400
        }
        return handleError(error);
    }

    const stockIsNan = isNaN(Number(stock));

    if(stockIsNan) {
        const error = {
            message: 'Debe ingresar un valor numérico en este campo',
            status: 400
        }
        return handleError(error);
    }

    if(!description.trim()) {
        const error = {
            message: 'Debe ingresar una descripción del producto',
            status: 400
        }
        return handleError(error);
    }

    return null;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        const productTitle = e.target.productTitle.value;
        const productCode = e.target.productCode.value;
        const productPrice = e.target.productPrice.value;
        const productStock = e.target.productStock.value;
        const productStatus = e.target.productStatus.value;
        const productCategory = e.target.productCategory.value;
        const productDescription = e.target.productDescription.value;

        const newProduct = {
            title: productTitle,
            code: productCode,
            price: productPrice,
            status: productStatus,
            category: productCategory,
            stock: productStock,
            description: productDescription
        }

        const dataHasError = checkFormValues(newProduct);

        if(dataHasError !== null) {
            console.warn(dataHasError)
            return null
        }

        const productWithNumericValues = {...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock)}

        

        const createProduct = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(productWithNumericValues, null, 2)
        })

        console.log(createProduct);

        e.target.reset();
        
    } catch (error) {
        console.error(error);
    }
    
})