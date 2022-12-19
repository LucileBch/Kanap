// Création d'une fonction asynchrone d'appel à l'API avec une requête GET
async function getDatas() {
    const res = await fetch('http://localhost:3000/api/products');
    const datas = await res.json();
    
    // Parcours du tableau de données avec une boucle FOR...OF pour l'affichage des données
    for(let data of datas) {
        const product =`
        <a href="./product.html?id=${data._id}">
        <article>
          <img src="${data.imageUrl}" alt="${data.altText}">
          <h3 class="productName">${data.name}</h3>
          <p class="productDescription">${data.description}</p>
        </article>
        </a>`;
        
        // Déclaration d'une variable qui pointe l'endroit où afficher les produits
        const section = document.querySelector('#items');
        section.insertAdjacentHTML('beforeend', product);
    }
}

// Lancement de la fonction
getDatas();