//---------------  AFFICHAGE PRODUIT ---------------
// Récupération de l'Id du produit dans l'URL
const urlSearchParams = new URLSearchParams(document.location.search)
const itemId = urlSearchParams.get('id')

// Récupération des informations uniques d'un produit en appelant les données de l'API
// Affichage des informations produits en pointant où l'on souhaite qu'elles apparaissent
// Récupération des options couleurs grâce à la boucle FOR...OF
// Lancement de la fonction pour afficher le produit
async function getDatas(){
    const res = await fetch('http://localhost:3000/api/products/' + itemId)
    const data = await res.json()

    document.querySelector('title').innerHTML = data.name
    document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    document.querySelector('#title').innerHTML = data.name
    document.querySelector('#price').innerHTML = data.price
    document.querySelector('#description').innerHTML = data.description

    for(option of data.colors){
        const color = `<option value="${option}">${option}</option>`
        document.querySelector('#colors').insertAdjacentHTML('beforeend', color)
    }
}
getDatas()

//--------------- GESTION DU PANIER ET LOCAL STORAGE---------------
//Ecoute de l'évènement addToCart au clic sur le bouton d'ajout au panier
// Récupération des valeurs de l'input color et quantité sélectionnées par l'utilisateur
// Test de la couleur pour voir si une couleur est bien sélectionnée
// Test de la quantité pour voir si elle est inférieure à 1 ou supérieure à 100
function addToCart () {
    document.querySelector('#addToCart').addEventListener('click', () => {
        
        const selectedColor = document.querySelector('#colors').value
        const selectedQuantity = document.querySelector('#quantity').value
        
        if (selectedColor === "") {
            alert ('Une couleur doit être sélectionnée')
        } else if (selectedQuantity < 1 || selectedQuantity > 100) {
            alert ('La quantité sélectionnée doit être comprise entre 1 et 100')
        
        // Si les deux conditions sont validées :
        // Si le panier est vide, création d'un tableau pour intègret l'item sélectionné par le client
        // Si le panier contient quelque chose, test de l'ID et de la couleur :
        // Identique : Modification de la quantité uniquement, avec une quantité plafonnée
        // Différent : Ajout de l'article au panier
        } else {
            let cart = JSON.parse(localStorage.getItem('clientItem'))

            let clientItem = {
                id : itemId,
                color : selectedColor,
                quantity : selectedQuantity
            }
            if(cart === null) {
                cart = []
                cart.push(clientItem)
                localStorage.setItem('clientItem', JSON.stringify(cart))
                alert ('Le produit a été ajouté au panier')
            } else {
                let getCartItem = cart.find((cartItem) => clientItem.id === cartItem.id && clientItem.color === cartItem.color)
                if(getCartItem) {
                    let totalQuantity = parseInt(clientItem.quantity) + parseInt(getCartItem.quantity)
                    if (totalQuantity < 101 ) {
                        getCartItem.quantity = totalQuantity
                        localStorage.setItem('clientItem', JSON.stringify(cart))
                        alert ('Le produit a été ajouté au panier')
                    } else {
                        alert ('La quantité dans le panier nest pas valide')
                        }
                } else {
                    cart.push(clientItem)
                    localStorage.setItem('clientItem', JSON.stringify(cart))
                    alert ('Le produit a été ajouté au panier')
                }
            }
        }
    })
}
//Lancement de la fonction addToCart
addToCart()