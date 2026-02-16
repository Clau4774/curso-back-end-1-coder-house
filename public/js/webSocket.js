import { productContainer } from "./main.js";


const socket = io();

socket.on('product', data => {
    if(data.type === 'newProduct') {
        console.log(data)

        const {title, description, price, stock, code, status, _id} = data.product._doc;
        console.log(data)

        console.log(price, 'price');
        console.log(typeof price, 'typeof Price')

        const priceWithFormat = price.toFixed(2);
        
        const newProduct = `
        <div class="product-card">
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Precio: $${priceWithFormat}</p>
            <p>Stock: ${stock}</p>
            <p>Code: ${code}</p>
            <p>Status: ${status}</p>
            <button data-add-to-cart="${_id}">Agregar al carro</button>
            <button data-product-id="${_id}">Borrar</button>
        </div>
        `;

        productContainer.innerHTML += newProduct;

    }
})