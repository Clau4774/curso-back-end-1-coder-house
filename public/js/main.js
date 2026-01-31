
const socket = io();

const form = document.querySelector('#product-form');
const productContainer = document.querySelector('#products-container');


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productTitle = e.target.productTitle.value;
    const productCode = e.target.productCode.value;
    const productPrice = e.target.productPrice.value;
    const productStock = e.target.productStock.value;
    const productStatus = e.target.productStatus.value;
    const productCategory = e.target.productCategory.value;

    const newProduct = {
        title: productTitle,
        code: productCode,
        price: productPrice,
        status: productStatus,
        category: productCategory,
        stock: productStock
    }

    
})