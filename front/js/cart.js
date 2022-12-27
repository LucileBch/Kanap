//---------------  TEST PRESENCE PRODUITS DANS LE PANIER ---------------
// Test présence de produits dans le local storage
// Si le local storage contient des produits, appel de la fonction getDatas
// Si le local storage est vide, affichage d'un message indicatif

let cart = JSON.parse(localStorage.getItem("clientItem"));

if (cart) {
    getDatas();
} else {
    document.querySelector("#cartAndFormContainer > h1").textContent = "Votre panier est vide";
}

//---------------  AFFICHAGE PRODUIT ---------------
// Fonction asynchrone d'appel à l'API
// Appel des fonctions d'affichage produits du panier, de modification des quantités et de suppression de produit
async function getDatas() {
    const res = await fetch("http://localhost:3000/api/products");
    const products = await res.json();

    displayCart(products);
    modifyQuantity(products);
    deleteItem(products);
}

// Fonction d'affichage produits du panier ayant pour paramètre les produits de l'API
// Parcours du tableau de produits présents dans le LS pour l'affichage des données
// Comparaison de l'Id des produits du LS et de l'API pour ajouter les infos non présentent dans le LS
// Appel de la fonction d'affichage du nombre total d'articles et du prix total
function displayCart(products) {
    for (let element of cart) {
        const product = products.find(p => p._id === element.id);

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
            </article>`;

        document.querySelector("#cart__items").insertAdjacentHTML("beforeend", display);
    }

    total(products);
}

//---------------  QUANTITE TOTALE & PRIX TOTAL ---------------
// Création de la fonction d'affichage des totaux (nombre d'articles et prix)
// Pointage sur les éléments d'affichage
// Déclaration et initialisation de la variable "total"
// Avec une boucle FOR...OF :
    // Incrémentation de la variable "total" avec chaque quantité présente dans le panier
    // Incrémentation de la variable "totalPrice" avec chaque quantité * prix unitaire des produits présents dans le panier
// Affichage de ces totaux dans les éléments pointés
function total(products) {
    let cart = JSON.parse(localStorage.getItem("clientItem"));
    const displayTotalQuantity = document.querySelector("#totalQuantity");
    let total = 0;
    for(let cartProduct of cart) {
        total += cartProduct.quantity;
    }
    displayTotalQuantity.innerText = total;

    const displayTotalPrice = document.querySelector("#totalPrice");
    let totalPrice = 0;
    for(let cartProduct of cart) {
        let quantity = cartProduct.quantity;
        const product = products.find(p => p._id === cartProduct.id);
        let price = product.price;
        totalPrice += price * quantity;
    }
    displayTotalPrice.innerText = totalPrice;
}

//---------------  GESTION DU PANIER ---------------
// Fonction de modification d'une quantité d'un produit
// Pointage sur l'élément "itemQuantity"
// Méthode FOR EACH, element.closest et dataset, écoute d'un changement de quantité pour chacun des produits présents dans le panier
// Condition : si la quantité n'est pas compris entre 1 et 100, affichage d'un message d'erreur
// Si la condition est respectée :
    // Modification du contenu de la page avec la nouvelle quantité
    // Appel de la fonction updateCart  pour mettre à jour le LS
function modifyQuantity(products) {
    let itemQuantities = document.querySelectorAll(".itemQuantity");

    itemQuantities.forEach(itemQuantity => {
        itemQuantity.addEventListener("change", (event) => {    
            let cartItem = itemQuantity.closest(".cart__item");
            let id = cartItem.dataset.id;
            let color = cartItem.dataset.color;
            let quantity = parseInt(itemQuantity.value);
            if(quantity < 1 || quantity > 100) {
                alert("La quantité sélectionnée doit être comprise entre 1 et 100");
            } else {
                updateCart(products, id, color, quantity);
            }
        })
    })
}

// Fonction de suppression d'un produit
// Pointage sur l'élément à écouter
// Méthode FOR EACH, element.closest et dataset, écoute du clic sur chacun des produits présents dans le panier
// Suppression de l'item sur la page
// Appel de la fonction updateCart pour mettre à jour le LS
function deleteItem(products) {
    let deleteButtons = document.querySelectorAll('.deleteItem');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", (event) => {
            let cartItem = deleteButton.closest(".cart__item");
            let id = cartItem.dataset.id;
            let color = cartItem.dataset.color;
            cartItem.remove();

            updateCart(products, id, color, 0);
        })
    })
}

// Fonction de mise à jour du LS
// Paramètres : produits de l'API + id, color, et quantity des fonctions de modification et suppression
// Condition :
    // Si quantité supérieure à 0, comparaison Id et couleur du produit pour mettre à jour la quantité
    // Sinon création nouveau tableau dans le LS
// Appel de la fonction total pour mettre à jour l'affichage total article et prix total
function updateCart(products, id, color, quantity) {
    let cart = JSON.parse(localStorage.getItem("clientItem"));

    if (quantity > 0) {
        for (let item of cart) {
            if(item.id === id && item.color === color) {
                item.quantity = quantity;
            }
        }
    } else {
        cart = cart.filter(item => item.id !== id || item.color !== color);
    }    
    
    localStorage.setItem("clientItem", JSON.stringify(cart));

    total(products);
}

//---------------  VALIDATION DU FORMULAIRE ---------------
// Création des RegEx 
    // Une pour les champs prénom, nom et ville : pas de chiffre
    // Une pour l'adresse : chiffres suivi de lettres
    // Une pour l'adresse email : présence du symbole @
// Pointage sur chaque élément du formulaire pour tester les données de l'utilisateur via les RegEx
const regexName = /^[a-zA-Zàäâçéèëêïîñöôùüû -]{3,30}$/;
const regexAddress = /^[0-9]{1,3}[a-zA-Zàäâçéèëêïîñöôùüû ,'-]{3,30}$/;
const regexEmail = /^.+@.+\..+$/;

document.querySelector("#firstName").addEventListener("input", testFirstName);
    function testFirstName() {  
        if(regexName.test(firstName.value)) {
            document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector('#firstNameErrorMsg').textContent = "Le prénom n'est pas valide";
            return false;
        }
    }

document.querySelector("#lastName").addEventListener("input", testLastName);
    function testLastName() {
        if(regexName.test(lastName.value)) {
            document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#lastNameErrorMsg").textContent = "Le nom n'est pas valide"
            return false;
        }
    }

document.querySelector("#address").addEventListener("input", testAddress);
    function testAddress() {
        if(regexAddress.test(address.value)) {
            document.querySelector("#addressErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#addressErrorMsg").textContent = "L'adresse n'est pas valide";
            return false;
        }
    }

document.querySelector("#city").addEventListener("input", testCity);
    function testCity() {
        if(regexName.test(city.value)) {
            document.querySelector("#cityErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#cityErrorMsg").textContent = "Le nom de la ville n'est pas valide";
            return false;
        }
    }

document.querySelector("#email").addEventListener("input", testEmail);
    function testEmail() {
        if(regexEmail.test(email.value)) {
            document.querySelector("#emailErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#emailErrorMsg").textContent = "L'adresse email n'est pas valide";
            return false;
        }
    }

// Fonction générale test du formulaire pour s'assurer que l'ensemble des champs sont valides
function testForm() {
    return (
        testFirstName()
        && testLastName()
        && testAddress()
        && testCity()
        && testEmail()
    );
}

//---------------  COMMANDE ---------------
// Pointage sur le bouton Commander et écoute de l'évènement formulaire au clic
document.querySelector("#order").addEventListener("click", formulaire);

// Fonction de regroupement des données à envoyer à l'AP
// Appel de la fonction testForm et si valide
    // Création d'un objet Contact contenant les infos de l'utilisateur
    // Création nouveau tableau products contenant les Id produits
// Appel de la fonction numéro de commande
function formulaire(event) {
    event.preventDefault();
    if (testForm()) {
        let contact = {
            firstName: firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value
        };
            
        let cart = JSON.parse(localStorage.getItem("clientItem"));
        let products = cart.map(item => item.id);

        numeroCommande(contact, products);
    }
}

// Fonction asynchrone de génération du numéro de commande
// Création d'une variable body, initialisée avec les informations contact et produits du panier
// Envoi des données à l'API via la requête POST
// Déclaration et initialisation d'une variable qui contient la réponse (numéro de commande) de l'API
// Redirection vers la page confiramtion avec l'orderId dans l'URL
// Suppression des informations contenues dans le local storage
async function numeroCommande(contact, products) {
    let body = {contact, products};

    const post = await fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    })

    const res = await post.json();
    const orderId = res.orderId;
    window.location.href = `confirmation.html?orderId=${orderId}`;
    localStorage.clear();
}