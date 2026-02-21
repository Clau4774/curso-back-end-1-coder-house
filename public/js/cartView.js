const cartContainer = document.querySelector('#cart-view-container');
const cartTotalPrice = document.querySelector('#cart-total-price');

const removeProductFromCart = async (e) => {
    
    try {
        const productId = e.target.dataset.removeButton || '';
        const cartId = document.URL.split('/').slice(-1).toString();
        console.log(cartId)

        if(!productId) return;


        if(productId) {
            const deleteProduct = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
                method: 'DELETE',            
            })
            
            console.log(deleteProduct)

            const productTotalPrice = Number(e.target.dataset.productTotal); 
            
            const cartTotalNewValue = Number(cartTotalPrice.innerText) - productTotalPrice;            

            const findParentNode = e.target.parentNode;

            if(cartTotalNewValue === 0) {
                cartTotalPrice.parentNode.innerText = 'El carro está vació.';

                return;    
            }

            cartTotalPrice.innerHTML = cartTotalNewValue.toFixed(2);

            findParentNode.remove();
            
            return 
        }

        throw {status: 400, error: `Hubo un error, no se pudo eliminar el producto con id ${productId} del carro ${cartId}`}
    }
     catch (error) {
        console.error(error);
    }
}

cartContainer.addEventListener('click', removeProductFromCart)