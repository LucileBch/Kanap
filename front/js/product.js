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

document.querySelector('#addToCart').addEventListener('click', () =>{
    Je récupère la valeur du input color
    je récupère la valeur de la quantité


    tester la couleur pour voir si vide, si vide mettre une alerte pour que l'utilisateur choisisse une couleur

    tester si quantité inférieure a 1 ou sup à 100 = mettre une alerte

    Si la couleur et la qet valide, lancer une fonction addToCart
})

//--------------- LOCAL STORAGE ---------------

Pour l'ajout au panier (localstorage)

Si un produit existe déjà = addition de la nouvelle qte a la qte déjà présente
Attention, il ne doit pas être possible d'avoir plus de 100 produit identique et pas de valeur négative
NE PAS STOCKER LE PRIX DANS LE localStorage