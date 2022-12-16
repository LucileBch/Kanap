let cart = JSON.parse(localStorage.getItem('clientItem'))

if (cart) {
    getDatas()
} else {
    document.querySelector('#cartAndFormContainer > h1').textContent = 'Votre panier est vide'
}

async function getDatas() {
    const resp = await fetch('http://localhost:3000/api/products')
    const products = await resp.json()
    displayCart(products)
}

function displayCart(products) {
    for (let element of cart) {
        const product = products.find(p => p._id === element.id)

        const display = `
            <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altText}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${element.name}</h2>
                        <p>${element.color}</p>
                        <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p> Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`

        document.querySelector('#cart__items').insertAdjacentHTML('beforeend', display)
    }
}