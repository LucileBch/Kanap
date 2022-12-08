//---------------  AFFICHAGE PRODUIT ---------------
// Test présence de produits dans le local storage avec un ternaire
// Si le local storage contient des produits, récupération de ces produits
// Si le local storage est vide, affichage d'un message indicatif
const cart = JSON.parse(localStorage.getItem('clientItem')) ? JSON.parse(localStorage.getItem('clientItem')) : document.querySelector('#cartAndFormContainer > h1').textContent = 'Votre panier est vide'




// Récupération des informations des produits présents dans le local storage
// Appel de la fonction de récupération du local storage
// Pour chacun de ces produits, récupération de l'Id dans l'URL
// Récupérer la réponse en json
// Appel d'une nouvelle fonction d'affichage


// Fonction d'affichage des informations
// 1. Reprendre l'ID, la couleur et la quantité dans le local storage
// 2. Récupérer le reste dans l'API




//---------------  MODIFICATION DU PANIER ---------------
// Evènement addEventListener 'change' pour observer le changement d'une quantité d'un produit
// Méthode Element.closest pour modifier une quantité ou supprimer un produit (grâce à id et couleur)
//function removeItemFromCart () {}

//function updateItemInCart (){}
//---------------  VALIDATION DU FORMULAIRE ---------------
// on teste le champ prénom et nom ==> pas de chiffre autorisé sinon msg d'erreur (voir Regex)
// on teste le champ email ==> il doit contenir un @ sinon msg d'erreur (voir Regex)
// consituer un tableau objet contact à partir du formulaire et un tableau produits






// écrire l'action qui se passe au click
//function onSubmitButtonClick (event) {
//    console.log('vous envoyez le formulaire')
//const submitButton = document.querySelector('submit', onSubmitButtonClick)