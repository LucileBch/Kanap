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

//--------------- GESTION DU PANIER ---------------

function addToCart () {
//J'écoute un évènement au clic sur le bouton d'ajout au panier
    document.querySelector('#addToCart').addEventListener('click', () => {
        // Je récupère dans une variabe la valeur de l'input color sélectionné par l'utilisateur
        const selectedColor = document.querySelector('#colors').value
        
        // Je récupère dans une variable la valeur de l'input quantité sélectionné par l'utilisateur
        const selectedQuantity = document.querySelector('#quantity').value

        // Je teste la couleur pour voir si une couleur est bien sélectionnée, si elle est vide je mets une alerte pour que l'utilisateur choisisse une couleur
        if (selectedColor === "") {
            alert ('Une couleur doit être sélectionnée')

        // Je teste la quantité pour voir si elle est inférieur à 1 ou supérieur à 100, si c'est le cas je mets une alerte pour indiquer que la quantité sélectionnée n'est pas autorisée
        } else if (selectedQuantity < 1 || selectedQuantity > 100) {
            alert ('La quantité sélectionnée doit être comprise entre 1 et 100')
        
        // Si les deux conditions sont validées, j'affiche un message d'ajout du produit au panier
        } else {
            alert ('Le produit a été ajouté au panier')
        }
    })
}
//Lancement de la fonction d'ajout du produit au panier
addToCart()