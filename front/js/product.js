//Variables globales
const urlSearchParams = new URLSearchParams(document.location.search)
const itemId = urlSearchParams.get('id')

const pageTitle = document.querySelector('title')
const itemImage = document.querySelector('.item__img')
const itemName = document.querySelector('#title')
const itemPrice = document.querySelector('#price')
const itemDescription = document.querySelector('#description')
const itemColors = document.querySelector('#colors')




// récupération des informations d'un produit

async function getDatas() {
    const res = await fetch('http://localhost:3000/api/products/' + itemId);
    const datas = await res.json();
}

// récupéré l'id dans url (searchparams)


// récupérer les données du produit unique dans l'api


// afficher les données du produit sur la page produit




getDatas()