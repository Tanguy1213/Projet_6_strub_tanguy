
//Bouton filtre objets
// const boutonObjets = document.querySelector(".btn-filtre-objets");

// boutonObjets.addEventListener("click", function(){
//     const categorieId = '1'; 

//     // Récupérer les éléments correspondant à la catégorie spécifiée
//     const elementsFiltresObjet = Array.from(document.querySelectorAll('[data-id]')).filter(element => {
//         return element.getAttribute('data-id') === categorieId;
//     });

//     // Vider la galerie actuelle
//     gallery.innerHTML = '';

//     // Ajouter les éléments filtrés à la galerie
//     elementsFiltresObjet.forEach(element => {
//         gallery.appendChild(element);
//     });
// });

//Bouton filtre appartements
// const boutonAppartements = document.querySelector(".btn-filtre-appartements");

// boutonAppartements.addEventListener("click", function(){
//     const categorieId = '2'; 

//     // Récupérer les éléments correspondant à la catégorie spécifiée
//     const elementsFiltresObjet = Array.from(document.querySelectorAll('[data-id]')).filter(element => {
//         return element.getAttribute('data-id') === categorieId;
//     });

//     // Vider la galerie actuelle
//     gallery.innerHTML = '';

//     // Ajouter les éléments filtrés à la galerie
//     elementsFiltresObjet.forEach(element => {
//         gallery.appendChild(element);
//     });
// });

const gallery = document.getElementById('gallery');
let elementsOriginaux = [];

//  Appel à l'API 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        genererTableau(data);
    })

function genererTableau(data) {
    // Vider la galerie actuelle
    gallery.innerHTML = '';

    // Réinitialiser la liste des éléments d'origine
    elementsOriginaux = [];

    // Parcours du tableau récupéré
    data.forEach(works => {
        // Création de l'élément figure
        const figureElement = document.createElement('figure');
        figureElement.setAttribute('data-id', works.categoryId);

        // Création de l'élément img
        const imgElement = document.createElement('img');
        imgElement.src = works.imageUrl;
        imgElement.alt = works.title;

        // Création de l'élément figcaption
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = works.title;

        // Ajout des éléments img et figcaption à l'élément figure
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);

        // Ajout de l'élément figure à la galerie
        gallery.appendChild(figureElement);

        // Ajout de l'élément figure à la liste des éléments d'origine
        elementsOriginaux.push(figureElement);
    });
}

// Fonction réutilisable pour filtrer et afficher les éléments en fonction de la catégorie
function filtrerEtAfficherElements(categorieId) {
    // Vider la galerie actuelle
    gallery.innerHTML = '';

    // Réinitialiser la liste des éléments filtrés
    const elementsFiltres = [];

    // Récupérer les éléments correspondant à la catégorie spécifiée
    elementsOriginaux.forEach(element => {
        if (element.getAttribute('data-id') === categorieId) {
            elementsFiltres.push(element);
        } else if (categorieId === 'tous') {
            elementsFiltres.push(element);
        }
    });

    // Ajouter les éléments filtrés à la galerie
    elementsFiltres.forEach(element => {
        gallery.appendChild(element);
    });
}

// Bouton filtres tous
const boutonTous = document.querySelector(".btn-filtre-tous");

boutonTous.addEventListener("click", function () {
    console.log("bouton affichant tout cliqué");
    filtrerEtAfficherElements('tous');
});

// Bouton filtre objets
const boutonObjets = document.querySelector(".btn-filtre-objets");

boutonObjets.addEventListener("click", function () {
    console.log("bouton affichant les objets cliqué");
    const categorieId = '1';
    filtrerEtAfficherElements(categorieId);
});

// Bouton filtre appartements
const boutonAppartements = document.querySelector(".btn-filtre-appartements");

boutonAppartements.addEventListener("click", function () {
    console.log("bouton affichant les appartements cliqué");
    const categorieId = '2';
    filtrerEtAfficherElements(categorieId);
});

// Bouton filtres hotels et restaurants
const boutonHotel = document.querySelector(".btn-filtre-hoteletrestaurants");

boutonHotel.addEventListener("click", function () {
    console.log("bouton affichant les hôtels et restaurants cliqué");
    const categorieId = '3';
    filtrerEtAfficherElements(categorieId);
});