
const gallery = document.getElementById('gallery');
const modalGallery = document.getElementById('modalGallery');
let elementsOriginaux = [];
let tokenValue = localStorage.token;
let travaux = [];

//  Appel à l'API 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        travaux = data;
        genererGallerie();
    })

function genererGallerie() {
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
    filtrerEtAfficherElements('tous');
});

// Bouton filtre objets
const boutonObjets = document.querySelector(".btn-filtre-objets");

boutonObjets.addEventListener("click", function () {
    const categorieId = '1';
    filtrerEtAfficherElements(categorieId);
});

// Bouton filtre appartements
const boutonAppartements = document.querySelector(".btn-filtre-appartements");

boutonAppartements.addEventListener("click", function () {
    const categorieId = '2';
    filtrerEtAfficherElements(categorieId);
});

// Bouton filtres hotels et restaurants
const boutonHotel = document.querySelector(".btn-filtre-hoteletrestaurants");

boutonHotel.addEventListener("click", function () {
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
const filters = document.getElementById('filtres');

if (localStorage.getItem('token')) {
    loginElement.textContent = 'logout';
    editBanner.style.display = 'flex';

    // Afficher les boutons de modification
    for (var i = 0; i < btnModif.length; i++) {
        btnModif[i].style.display = 'inline-block';
    }
    // Supprimer les filtres si connecté
    filters.style.display = 'none'
    gallery.style.marginTop = '2em'
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
let modal2 = null

//MODAL1
const showModal1 = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null;
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', hideModal)
    modal.querySelector('.js-close-modal').addEventListener('click', hideModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modal.querySelector('.js-open-modal2').addEventListener('click', showModal2)

    function genererGallerieModal() {
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

            //Suppression de l'élément de la database au clique sur la poubelle
            trashButton.addEventListener('click', function () {
                deleteWork(works.id)
            });

        });
    }
    genererGallerieModal();
    const deleteWork = async (id) => {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        if (response.ok) {
            const index = travaux.findIndex(t => t.id === id)
            if (index !== -1) {
                travaux.splice(index, 1)
            }
            genererGallerie()
            genererGallerieModal()
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }
    };
}
//MODAL 2
const showModal2 = function (e) {
    e.preventDefault()
    /* hidding modal1*/
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-modal', 'false')

    /*Showing modal2 */
    modal2 = document.querySelector(e.target.getAttribute('href'))
    modal2.style.display = null;
    modal2.setAttribute('aria-hidden', 'false')
    modal2.setAttribute('aria-modal', 'true')
    modal2.addEventListener('click', hideModal2)
    modal2.querySelector('.js-close-modal').addEventListener('click', hideModal2)
    modal2.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    returnToModal1();
}

function returnToModal1() {
    arrowLeft = document.querySelector('.arrowLeft');
    arrowLeft.addEventListener('click', function () {
        modal2.style.display = "none";
        modal2.setAttribute('aria-hidden', 'true')
        modal2.setAttribute('aria-modal', 'false')
        modal.style.display = null;
        modal.setAttribute('aria-hidden', 'false')
        modal.setAttribute('aria-modal', 'true')
    })
}
const hideModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    hideModal2(e);
}
const hideModal2 = function (e) {
    if (modal2 === null) return
    e.preventDefault()
    window.setTimeout(function () {
        modal2.style.display = "none"
        modal2 = null
    }, 500)
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')

    /*Reset de la modal2, de son formulaire et effacement de la preview,  */
    document.getElementById('formChoix').reset();
    toggleErrorAndButton();
    fileImgDiv.style.display = null;
    var previewToDelete = document.getElementById('fileUploaded')
    if (previewToDelete != null) { //Si une image est dans la preview -> delete
        previewToDelete.remove();
    }
}


/*Gestion du formulaire d'ajout d'image dans la modal*/
var form = document.getElementById("formChoix");
const sendButton = document.getElementById("send");
const categoryError = document.getElementById("category-error");
const fileInput = document.getElementById("file");
const imageIcon = document.getElementById("image-icon");
const fileImgDiv = document.getElementById("fileImg");
const previewImg = document.getElementById('preview');


async function addWork() {
    // Récupérer les valeurs des champs du formulaire
    var image = document.getElementById('file').files[0];
    var title = document.getElementById('titre').value;
    var categorySelect = document.getElementById('choix');
    var category = categorySelect.value;

    // Créer un objet FormData pour envoyer les données du formulaire
    var formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);

    try {
        // Effectuer la requête POST vers notre API
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            },
            body: formData
        });

        // Récupérer le nouvel élément créé à partir de la réponse de l'API
        const newWork = await response.json();

        // Ajouter le nouvel élément à la suite du tableau travaux
        travaux.push(newWork);
        genererGallerie();
        console.log('Réponse de l\'API:', response);

    } catch (error) {
        console.error('Erreur lors de la requête:', error);
    }
}

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            const imageUrl = reader.result;
            const imageElement = document.createElement("img");
            imageElement.setAttribute('id', 'fileUploaded');
            imageElement.src = imageUrl;
            imageElement.alt = "Prévisualisation de l'image";
            imageElement.style.height = "230px";
            imageElement.style.objectFit = "contain";

            // cacher les éléments lorsque l'utilisateur ajoute une photo
            fileImgDiv.style.display = "none";
            // Ajouter l'image à la preview
            previewImg.appendChild(imageElement);
        });
        reader.readAsDataURL(file);
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut
    toggleErrorAndButton();

    if (sendButton.classList.contains("enabled")) {
        addWork();
        hideModal2(event);/// Soumet le formulaire et fermer la modal
    } else {
        toggleErrorAndButton();
    }
});

form.addEventListener("input", function () {
    toggleErrorAndButton();
});

function toggleErrorAndButton() {
    const titreInput = document.getElementById("titre");
    const categorieSelect = document.getElementById("choix");

    if (titreInput.value !== "" && categorieSelect.value !== "vide" && fileInput.files.length > 0) {
        categoryError.style.display = "none";
        sendButton.removeAttribute("disabled");
        sendButton.classList.remove("disabled");
        sendButton.classList.add("enabled");
    } else {
        categoryError.style.display = "block";
        sendButton.setAttribute("disabled", "true");
        sendButton.classList.remove("enabled");
        sendButton.classList.add("disabled");
    }
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', showModal1)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        hideModal(e)
        hideModal2(e)
    }
})