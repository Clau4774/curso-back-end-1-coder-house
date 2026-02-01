import { productContainer } from "./main.js";


const socket = io();

socket.on('product', data => {
    if(data.type === 'newProduct') {

        const {title, description, price, stock, code, status, id} = data.product;

        const priceWithFormat = price.toFixed(2);
        
        const newProduct = `
        <div class="product-card">
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Precio: $${priceWithFormat}</p).toFixed(2)>
            <p>Stock: ${stock}</p>
            <p>Code: ${code}</p>
            <p>Status: ${status}</p>
            <button data-product-id="${id}">Borrar</button>
        </div>
        `;

        productContainer.innerHTML += newProduct;

    }
})