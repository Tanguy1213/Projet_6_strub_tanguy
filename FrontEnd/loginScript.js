//Fonction pour montrer/cacher le mot de passe
function showPassWord() {
  var password = document.getElementById("mdp");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

document.getElementById('showMdp').addEventListener('click',showPassWord);

//Script permettant le login et logout de l'utilisateur
document.getElementById('btn-submit').addEventListener('click', function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('mdp').value;
  const loginData = {
    email: email,
    password: password
  };

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.userId && data.token) {
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = './index.html';
      } else {
        alert('Erreur de connexion : Login ou mot de passe incorrect');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête de login:', error);
    });
});