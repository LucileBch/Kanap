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
    modifyQuantity(products)
    deleteItem(products)
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
    let cart = JSON.parse(localStorage.getItem('clientItem'))
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
function modifyQuantity(products) {
    let itemQuantities = document.querySelectorAll('.itemQuantity')

    itemQuantities.forEach(itemQuantity => {
        itemQuantity.addEventListener('change', (event) => {    
            let cartItem = itemQuantity.closest('.cart__item')
            let id = cartItem.dataset.id
            let color = cartItem.dataset.color
            let quantity = parseInt(itemQuantity.value)
            if(quantity < 1 || quantity > 100) {
                alert('La quantité sélectionnée doit être comprise entre 1 et 100')
            } else {
                updateCart(products, id, color, quantity)
            }
        })
    })
}

// fonction suppression produit
function deleteItem(products) {
    let deleteButtons = document.querySelectorAll('.deleteItem')

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            let cartItem = deleteButton.closest('.cart__item')
            let id = cartItem.dataset.id
            let color = cartItem.dataset.color
            cartItem.remove()

            // appel de la fonction update cart
            updateCart(products, id, color, 0)
        })
    })
}

//fonction update Cart local storage
function updateCart(products, id, color, quantity) {
    let cart = JSON.parse(localStorage.getItem('clientItem'))

    if (quantity > 0) {
        for (let item of cart) {
            if(item.id === id && item.color === color) {
                item.quantity = quantity
            }
        }
    } else {
        cart = cart.filter(item => item.id !== id || item.color !== color)
    }

    localStorage.setItem('clientItem', JSON.stringify(cart))
    total(products)
}

