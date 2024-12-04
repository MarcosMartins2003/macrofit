var loginForm = document.getElementById('loginForm');

loginForm.onsubmit = function (event) {
    event.preventDefault();

    
    firebase.auth().signInWithEmailAndPassword(loginForm.emailLogin.value, loginForm.passwordLogin.value)
      .then(() => {
          // Login bem-sucedido, redireciona para profile.html
          window.location.href = "profile.html";
      })
      .catch(function (error) {
          console.log('Falha no acesso');
          console.log(error);
      });



      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // A persistência foi configurada com sucesso
    console.log("Persistência configurada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

}

function signOut() {
    firebase.auth().signOut().catch(function(error) {
        console.log('Falha ao sair');
        console.log(error);
    });
}
