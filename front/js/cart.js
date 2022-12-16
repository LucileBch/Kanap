let cart = JSON.parse(localStorage.getItem('clientItem'))

//si produits dans le panier, appel fonction affichage - si non msg panier vide
if (cart) {
    getDatas()
} else {
    document.querySelector('#cartAndFormContainer > h1').textContent = 'Votre panier est vide'
}

//fonction appel données API
async function getDatas() {
    const resp = await fetch('http://localhost:3000/api/products')
    const products = await resp.json()

    //appel fonction affichage produits du panier
    displayCart(products)
    modifyQuantity()
    deleteItem()
}

//fonction affichage produits du panier
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
    //appel fonction total prix et quantié
    total(products)
}

//fonction total prix et quantité
function total(products) {
    const displayTotalQuantity = document.querySelector('#totalQuantity')
    let total = 0
    for(let cartProduct of cart) {
        total += cartProduct.quantity
    }
    displayTotalQuantity.innerText = total

    const displayTotalPrice = document.querySelector('#totalPrice')
    let totalPrice = 0
    for(let cartProduct of cart) {
        let quantity = cartProduct.quantity
        const product = products.find(p => p._id === cartProduct.id)
        let price = product.price
        totalPrice += price * quantity
    }
    displayTotalPrice.innerText = totalPrice
}

// fonction modification quantité
function modifyQuantity() {
    let itemQuantities = document.querySelectorAll('.itemQuantity')

    itemQuantities.forEach(itemQuantity => {
        itemQuantity.addEventListener('change', (event) => {            
            if(itemQuantity.value < 1 || itemQuantity.value > 100) {
                alert('La quantité sélectionnée doit être comprise entre 1 et 100')
            } else {
                // appeler la fonction update cart
            }
        })
    })
}

// fonction suppression produit
function deleteItem() {
    let deleteButtons = document.querySelectorAll('.deleteItem')

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            alert('Le produit a été supprimé du panier')
            // appel de la fonction update cart
        })
    })
}

