//---------------  AFFICHAGE PRODUIT ---------------
// Test présence de produits dans le local storage
// Si le local storage est vide, affichage d'un message indicatif
// Si le local storage contient des produits, récupération des infos de ces produits dans le tableau cart
const cart = JSON.parse(localStorage.getItem('clientItem'))

function testLocalStorage() {
    if(cart) {
        getDatas()
    } else {
        document.querySelector('#cartAndFormContainer > h1').textContent = 'Votre panier est vide'
    }
}
testLocalStorage()


async function getDatas() {
    for(let cartProduct of cart) {
        let product = {
            id : cartProduct.id,
            name : cartProduct.name,
            color : cartProduct.color,
            quantity : cartProduct.quantity
        }
    
    const res = await fetch('http://localhost:3000/api/products/' + product.id)
    const data = await res.json()

    const display = `
        <article class="cart__item" data-id="${cartProduct.id}" data-color="${cartProduct.color}">
            <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altText}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${cartProduct.name}</h2>
                    <p>${cartProduct.color}</p>
                    <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p> Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartProduct.quantity}">
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
