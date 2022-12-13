//---------------  AFFICHAGE PRODUIT ---------------
// Test présence de produits dans le local storage
// Si le local storage contient des produits, appel de la fonction getDatas
// Si le local storage est vide, affichage d'un message indicatif
const cart = JSON.parse(localStorage.getItem('clientItem'))

function testLocalStorage() {
    if(cart) {
        getDatas()
    } else {
        document.querySelector('#cartAndFormContainer > h1').textContent = 'Votre panier est vide'
    }
}
testLocalStorage()

// Fonction de récupération des informations produits dans l'API et dans le Local Storage
// Variable "product" dans laquelle on stocke les informations du Local Storage et qui permet d'appeler l'API grâce à l'Id
// Variable "display" qui permet de déclarer commment l'affichage doit se faire
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

// Appel des fonctions :
    // D'affichage de la quantité totale de produit dans le panier
    // D'affichage du prix total
    // De modification de la quantité d'un produit
    // De suppression de produit
    totalQuantity()
    totalPrice()
    updateQuantity()
    removeItem()
}

//---------------  FONCTIONS QUANTITE TOTALE & PRIX TOTAL ---------------
// Création de la fonction d'affichage du nombre total de produit dans le panier
// Pointage sur l'élément totalQuantity
// Déclaration et initialisation de la variable "total"
// Avec la boucle for...of, incrémentation de la variable "total" avec chaque quantité présente dans le panier
// Affichage de cette quantité totale dans l'élément pointé
function totalQuantity() {
    const displayTotalQuantity = document.querySelector('#totalQuantity')
    let total = 0
    for(let cartProduct of cart) {
        total += parseInt(cartProduct.quantity)
    }
    displayTotalQuantity.innerText = total
}

// Création de la fonction d'affichage du prix total du panier
// Pointage sur l'élément "totalPrice"
// Déclaration des variables "getQuantity" et "getPrice" pour récupérer les données de la page à manipuler
// Déclaration et initialisation de "totalPrice"
// Via la boucle FOR, création de l'opération mathématique a effectuée sur chaque produit du panier et incrémentation de la valeur dans la variabel "totalPrice"
// Affichage de ce prix total dans l'élément pointé
function totalPrice() {
    const displayTotalPrice = document.querySelector('#totalPrice')
    let getQuantity = document.querySelectorAll('.itemQuantity')
    let getPrice = document.querySelectorAll('.cart__item__content__description')
    let totalPrice = 0
    for(let i = 0; i < getPrice.length; i++) {
        totalPrice += parseInt(getPrice[i].lastElementChild.textContent) * getQuantity[i].value
        console.log(totalPrice)
    }
    displayTotalPrice.innerText = totalPrice
}

//---------------  FONCTIONS MODIFICATION DU PANIER ---------------
//Fonction de modification d'une quantité d'un produit
// Pointage sur l'élément "itemQuantity"
// Via la boucle FOR, écoute d'un changement de quantité pour chacun des produits présents dans le panier
// Condition : si la quantité n'est pas compris entre 1 et 100, affichage d'un message d'erreur
// Si la condition est respectée :
    // modification du contenu de la page avec la nouvelle quantité
    // modification de la quantité dans le local storage
    // message de confirmation de quantité modifiée dans le panier
    // raffraichissement de la page pour afficher le contenu modifié
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

// Fonction de suppression d'un produit
// Pointage sur l'élément à écouter
// Via la boucle FOR, écoute du clic sur chacun des produits présents dans le panier
// Déclaration et initialisation des variables(Id et couleur) pour cibler le produit à supprimer
// Filtre du tableau pour en créer un nouveau selon les conditions Id et couleur testées
// Suppression de l'item dans le Local Storage
// Message de confirmation de suppression
// Rafraichissement de la page
function removeItem() {
    let deleteItem = document.querySelectorAll('.deleteItem')

    for(let i = 0; i < deleteItem.length; i++) {
        deleteItem[i].addEventListener('click', (e) => {
            e.preventDefault(e)
            let itemId = cart[i].id
            let itemColor = cart[i].color
            let cartfilter = cart.filter(cart => cart.id !== itemId || cart.color !== itemColor)
            let newCart = cartfilter
            localStorage.setItem('clientItem', JSON.stringify(newCart))
            alert('Le produit a été supprimé du panier')
            location.reload()
        })
    }
}

//---------------  VALIDATION DU FORMULAIRE ---------------
// Création des RegEx 
    // Une pour les champs prénom, nom et ville : pas de chiffre
    // Une pour l'adresse : chiffres suivi de lettres
    // Une pour l'adresse email : présence du symbole @
const regexName = /^[a-zA-Zàäâçéèëêïîñöôùüû'-]{3,30}$/
const regexAddress = /^[0-9]{1,3}[a-zA-Zàäâçéèëêïîñöôùüû ,'-]{3,30}$/


// Test des différents champs du formulaire grâce aux Regex concernés
document.querySelector('#firstName').addEventListener('input', testFirstName)
    function testFirstName() {
        if(regexName.test(firstName.value)) {
            document.querySelector('#firstNameErrorMsg').textContent = " "
            return true
        } else {
            document.querySelector('#firstNameErrorMsg').textContent = 'Le prénom n\'est pas valide'
            return false
        }
    }

document.querySelector('#lastName').addEventListener('input', testLastName)
    function testLastName() {
        if(regexName.test(lastName.value)) {
            document.querySelector('#lastNameErrorMsg').textContent = " "
            return true
        } else {
            document.querySelector('#lastNameErrorMsg').textContent = 'Le nom n\'est pas valide'
            return false
        }
    }

document.querySelector('#address').addEventListener('input', testAddress)
    function testAddress() {
        if(regexAddress.test(address.value)) {
            document.querySelector('#addressErrorMsg').textContent = " "
            return true
        } else {
            document.querySelector('#addressErrorMsg').textContent = 'L\'adresse n\'est pas valide'
            return false
        }
    }

document.querySelector('#city').addEventListener('input', testCity)
    function testCity() {
        if(regexName.test(city.value)) {
            document.querySelector('#cityErrorMsg').textContent = " "
            return true
        } else {
            document.querySelector('#cityErrorMsg').textContent = 'Le nom de la ville n\'est pas valide'
            return false
        }
    }



//---------------  ENVOI COMMANDE & FORMULAIRE ---------------
// consituer un tableau objet contact à partir du formulaire et un tableau produits

