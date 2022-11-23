// Appel à l'API qui contient les données avec une requête GET
async function getDatas() {
    const res = await fetch('http://localhost:3000/api/products');
    // Spécification du format attendu pour les résultats
    const datas = await res.json();

    // Création d'une boucle FOR...OF pour sélectionner quelles informations, pour chacun des produits, sont à afficher en les appelant via ${}
    for(let data of datas) {
        const product =`
        <a href="./product.html?id=${data._id}">
        <article>
          <img src="${data.imageUrl}" alt="${data.altText}">
          <h3 class="productName">${data.name}</h3>
          <p class="productDescription">${data.description}</p>
        </article>
        </a>`
    
        // Déclaration d'une variable pour pointer dans quel élément on souhaite afficher les produits
        const section = document.querySelector('#items')
        //Précision de la position dans l'élément (à l'intérieur de l'élement, juste après son dernier enfant) et appel à la fonction product pour dire ce qui doit être affiché
        section.insertAdjacentHTML('beforeend', product)
    }
}

// Lancement de la fonction
getDatas()