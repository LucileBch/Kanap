//consignes :
// récupération des informations d'un produit
// récupérer l'id dans url (searchparams)
// récupérer les données du produit unique dans l'api
// afficher les données du produit sur la page produit

// Variables globales
const urlSearchParams = new URLSearchParams(document.location.search)
const itemId = urlSearchParams.get('id')
console.log(itemId)

const pageTitle = document.querySelector('title')
const itemImage = document.querySelector('.item__img')
const itemName = document.querySelector('#title')
const itemPrice = document.querySelector('#price')
const itemDescription = document.querySelector('#description')
const itemColors = document.querySelector('#colors')

// je fais appel à l'API avec une requête GET pour récupérer les données produits via l'ID
fetch (`http://localhost:3000/api/products/${itemId}`)
    
    // avec la fonction then(), je récupère le résultat de la requête au format json et vérifie que la requête s'est bien passée grâce à res.ok
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    // avec la 2ème fonction then(), je récupère les vraies valeurs des résultats et je modifie les variables pour leurs attribuer les données souhaitées
    .then(data => {
        pageTitle.innerText = `${data.name}`
        itemImage.innerHTML = `<img src="${data.imageUrl}" alt="${data.altText}"></img>`
        itemName.textContent = `${data.name}`
        itemPrice.textContent = `${data.price}`
        itemDescription.textContent = `${data.description}`
    
        // voir forEach ? object.values ?
        data.colors.forEach((color) => {
            let colorOption = document.createElement("option")
            colorOption.innerHTML = `${color}`
            colorOption.value = `${color}`
            itemColors.appendChild(colorOption)
            console.log(itemColors)
        });
    })

    // appel de la fonction catch() si une erreur survient lors de la requête
    .catch (error => {
        alert('Le serveur ne répond pas')
    })



function onButtonClick (event) {
    //écrire l'action qui se passe au clic ++ préciser ici les conditions
    console.log('button click')
}

const button = document.querySelector('#addToCart')
button.addEventListener('click', onButtonClick) //appel de la fonction qui définit l'action qui se passe au clic

// si quantité < 1 ou > 100 et couleur non sélectionnée ==> on ajoute pas au panier



