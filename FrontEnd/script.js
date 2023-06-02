
const gallery = document.getElementById('gallery');
const modalGallery = document.getElementById('modalGallery');
let elementsOriginaux = [];
let tokenValue = localStorage.token;
let travaux = [];

//  Appel à l'API 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        travaux=data;
        genererTableau();
    })

function genererTableau() {
    // Vider la galerie actuelle
    gallery.innerHTML = '';

    // Réinitialiser la liste des éléments d'origine
    elementsOriginaux = [];

    // Parcours du tableau récupéré
    travaux.forEach(works => {
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

// Changement de la couleur des boutons de filtres quand séléctionnés
function changeColor(btn) {
    var buttons = document.getElementsByClassName('btn-filtre');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-selected");
    }
    btn.classList.add("btn-selected");
}

// Changement du text login en logout lorsque l'utilsateur est connecté et vis versa + afficher/cacher banières, boutons filtres, bouton de modif
const loginElement = document.getElementById('logout');
const editBanner = document.getElementById('loginBanner');
const btnModif = document.getElementsByClassName('btn-modifier');
const btnFiltres = document.getElementsByClassName('btn-filtre');

if (localStorage.getItem('token')) {
    loginElement.textContent = 'logout';
    editBanner.style.display = 'flex';
    // Afficher les boutons de modification
    for (var i = 0; i < btnModif.length; i++) {
        btnModif[i].style.display = 'inline-block';
    }
    // Supprimer les filtres si connecté
    while (btnFiltres.length > 0) {
        btnFiltres[0].parentNode.removeChild(btnFiltres[0]);
    }

} else {
    loginElement.textContent = 'login';
    editBanner.style.display = 'none';
    // Supprimer les boutons de modification
    while (btnModif.length > 0) {
        btnModif[0].parentNode.removeChild(btnModif[0]);
    }
};

loginElement.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        loginElement.textContent = 'Login';
        // Supprimer les boutons de modification lors de la déconnexion
        while (btnModif.length > 0) {
            btnModif[0].parentNode.removeChild(btnModif[0]);
        }
    }
});

//MODAL
let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusElement = document.querySelector(':focus')
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

    function genererTableauModal() {
        // Vider la galerie actuelle
        modalGallery.innerHTML = '';

        // Réinitialiser la liste des éléments d'origine
        elementsOriginaux = [];

        // Parcours du tableau récupéré
        travaux.forEach(works => {
            // Création de l'élément figure
            const figureElement = document.createElement('figure');
            figureElement.setAttribute('data-id', works.categoryId);

            // Création de l'élément img
            const imgElement = document.createElement('img');
            imgElement.src = works.imageUrl;
            imgElement.alt = works.title;

            // Création de l'élmement supprimer et move
            const buttonContainer = document.createElement('div');
            buttonContainer.className = "buttonContainer";

            // Création du bouton poubelle avec son icone
            const trashButton = document.createElement('button');
            const trashIcon = document.createElement('img');
            trashIcon.src = "./assets/icons/VectorTrash.svg";
            trashIcon.className = "trashIcon";

            // Création du bouton move avec son icone
            const moveButton = document.createElement('button');
            const moveIcon = document.createElement('img');
            moveIcon.src = "./assets/icons/VectorMove.svg";
            moveIcon.className = "moveIcon";

            // Création du text éditer
            const editCaption = document.createElement('p');
            editCaption.textContent = "éditer";
            editCaption.classList = "editerStyle";


            // Gestion de l'highlight sur le survol du texte p
            editCaption.addEventListener('mouseover', function () {
                imgElement.classList.add('highlighted-blue');
            });
            editCaption.addEventListener('mouseout', function () {
                imgElement.classList.remove('highlighted-blue');
            });
            // Gestion de l'highlight sur le survol de la poubelle
            trashButton.addEventListener('mouseover', function () {
                imgElement.classList.add('highlighted-red');
            });
            trashButton.addEventListener('mouseout', function () {
                imgElement.classList.remove('highlighted-red');
            });

            
            buttonContainer.appendChild(moveButton);
            moveButton.appendChild(moveIcon);

            buttonContainer.appendChild(trashButton);
            trashButton.appendChild(trashIcon);
            
            // Ajout de l'img, le container de boutons et la caption à l'élément figure
            figureElement.appendChild(imgElement);
            figureElement.appendChild(buttonContainer);
            figureElement.appendChild(editCaption);

            // Ajout de l'élément figure à la galerie
            modalGallery.appendChild(figureElement);
            
            //Suppression de la database au clique sur la poubelle
            trashButton.addEventListener('click', function () {
                deleteWork(works.id)
            });
        });
    }
    genererTableauModal();
    const deleteWork = async (id) => {
        console.log(id);
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        if (response.ok) {
            console.log('Supprimé');
            console.log(travaux);
            console.log(id);
            const index = travaux.findIndex(t=>t.id===id)
            if(index !== -1){
                travaux.splice(index,1)
            }
            console.log(travaux)
            genererTableau()
            genererTableauModal()
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }
    };
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusElement != null) {
        previouslyFocusElement.focus()
    }
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.lenght) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.lenght - 1
    }
    focusables[index].focus()
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})