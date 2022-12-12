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

    totalQuantity()
    totalPrice()
    updateQuantity()
}

//---------------  FONCTIONS QUANTITE TOTALE & PRIX TOTAL ---------------
function totalQuantity() {
    const displayTotalQuantity = document.querySelector('#totalQuantity')
    let total = 0
    for(let cartProduct of cart) {
        total += cartProduct.quantity
    }
    displayTotalQuantity.innerText = total
}

function totalPrice() {
    const displayTotalPrice = document.querySelector('#totalPrice')
    let getQuantity = document.querySelectorAll('.itemQuantity')
    let getPrices = document.querySelectorAll('.cart__item__content__description')
    let totalPrice = 0
    for(let i = 0; i < getPrices.length; i++) {
        totalPrice += parseInt(getPrices[i].lastElementChild.textContent) * getQuantity[i].value
        console.log(totalPrice)
    }
    displayTotalPrice.innerText = totalPrice
}

//---------------  FONCTIONS MODIFICATION DU PANIER ---------------
function updateQuantity() {
    let newQuantity = document.querySelectorAll('.itemQuantity')

    for(let i = 0; i < newQuantity.length; i++) {
        const updatedQuantity = newQuantity[i]
        
        updatedQuantity.addEventListener('change', (e) => {
            e.preventDefault(e)
        
            if(updatedQuantity.value < 1 || updatedQuantity.value > 100) {
                alert('La quantité sélectionnée doit être comprise entre 1 et 100')
            } else {
                newQuantity.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.target.value}">`
                cart[i].quantity = updatedQuantity.value
                localStorage.setItem('clientItem', JSON.stringify(cart))
                alert('La quantité produit a été mise à jour dans le panier')
                location.reload()
            }
        })
    }
}
