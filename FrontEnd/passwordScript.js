//Fonction pour montrer/cacher le mot de passe
function showPassWord() {
  var password = document.getElementById("mdp");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}