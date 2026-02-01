import { productContainer } from "./main.js";


const socket = io();

socket.on('product', data => {
    if(data.type === 'newProduct') {

        const {title, description, price, stock, code, status, id} = data.product;
        
        const newProduct = `
        <div>
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Precio: $${price}</p>
            <p>Stock: ${stock}</p>
            <p>Code: ${code}</p>
            <p>Status: ${status}</p>
            <button data-product-id="${id}">Borrar</button>
        </div>
        `;

        productContainer.innerHTML += newProduct;

    }
})