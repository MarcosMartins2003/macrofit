var registerForm = document.getElementById('registerForm');

registerForm.onsubmit = function (event) {
    
    try{
        if (registerForm.confirmPasswordRegister.value != registerForm.passwordRegister.value) throw new Error("As senhas não coincidem!")

            event.preventDefault();

            firebase.auth().createUserWithEmailAndPassword(registerForm.emailRegister.value, registerForm.passwordRegister.value)
            .then(() => {
                
                window.location.href = "login.html";
            })
            .catch(function (error) {
                console.log('Falha no cadastro');
                console.log(error);
            });
    } catch (error){
        console.log("Falha no cadastro => "+error);
    }

}
