//---------------  AFFICHAGE PRODUIT ---------------
// Récupération de l'Id du produit dans l'URL
const urlSearchParams = new URLSearchParams(document.location.search)
const itemId = urlSearchParams.get('id')

// Récupération des informations uniques d'un produit en appelant les données de l'API
async function getDatas(){
    const res = await fetch('http://localhost:3000/api/products/' + itemId)
    const data = await res.json()

    // Affichage des informations produits en pointant où l'on souhaite qu'elles apparaissent
    document.querySelector('title').innerHTML = data.name
    document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    document.querySelector('#title').innerHTML = data.name
    document.querySelector('#price').innerHTML = data.price
    document.querySelector('#description').innerHTML = data.description

    // Récupération des options couleurs grâce à la boucle FOR...OF
    for(option of data.colors){
        const color = `<option value="${option}">${option}</option>`
        document.querySelector('#colors').insertAdjacentHTML('beforeend', color)
    }
}
// Lancement de la fonction pour afficher le produit 
getDatas()

//--------------- GESTION DU PANIER ET LOCAL STORAGE---------------

function addToCart () {
//J'écoute l'évènement addToCart au clic sur le bouton d'ajout au panier
    document.querySelector('#addToCart').addEventListener('click', () => {
        
        // Je récupère dans des variables la valeur de l'input color et de l'input quantité sélectionné par l'utilisateur
        const selectedColor = document.querySelector('#colors').value
        const selectedQuantity = document.querySelector('#quantity').value

        // Je teste la couleur pour voir si une couleur est bien sélectionnée, si elle est vide je mets une alerte pour que l'utilisateur choisisse une couleur
        if (selectedColor === "") {
            alert ('Une couleur doit être sélectionnée')

        // Je teste la quantité pour voir si elle est inférieur à 1 ou supérieur à 100, si c'est le cas je mets une alerte pour indiquer que la quantité sélectionnée n'est pas autorisée
        } else if (selectedQuantity < 1 || selectedQuantity > 100) {
            alert ('La quantité sélectionnée doit être comprise entre 1 et 100')
        
        // Si les deux conditions sont validées, 
        } else {
            let cart = JSON.parse(localStorage.getItem('clientItem'))

            let clientItem = {
                id : itemId,
                color : selectedColor,
                quantity : selectedQuantity
            }

            // on regarde si le panier est vide, on créé un tableau dans lequel on intègre l'item sélectionné par le client
            if(cart === null) {
                cart = []
                cart.push(clientItem)
                localStorage.setItem('clientItem', JSON.stringify(cart))
            
            // si le panier contient quelque chose, on test son ID et sa couleur et si c'est la même on ne modifie que la quantité du panier, avec une quantité plafonnée
            } else {
                let getCartItemColor = cart.find((cartItemColor) => clientItem.id === cartItemColor.id && clientItem.color === cartItemColor.color)
                if(getCartItemColor) {
                    let number = parseInt(clientItem.quantity) + parseInt(getCartItemColor.quantity)
                    if (number < 101 ) {
                        getCartItemColor.quantity = number
                        localStorage.setItem('clientItem', JSON.stringify(cart))
                    } else {
                        alert ('La quantité dans le panier nest pas valide')
                        }

                // Si l'item sélectionné à le même ID mais pas la même couleur, on ajoute l'article au panier
                } else {
                    cart.push(clientItem)
                    localStorage.setItem('clientItem', JSON.stringify(cart))
                }
            }
        }
    })
}
//Lancement de la fonction d'ajout du produit au panier
addToCart()