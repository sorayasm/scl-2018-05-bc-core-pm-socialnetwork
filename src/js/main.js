window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loggedIn.style.display = "block";
            loggedOut.style.display = "none";
        } else {
            loggedIn.style.display = "none";
            loggedOut.style.display = "block";
        }
        console.log("User > " + JSON.stringify(user));
    });

    // ejemplo

}

// Registro
function registerWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log("usuario se creo");
        })
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code);
            console.log("Error de Firebase > Mensaje > " + error.message);
        });
}

//Login
function loginWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log("Usuario inició sesión con éxito");
        })
        .catch((error) => {
            console.log("Error de firebase > Código > " + error.code);
            console.log("Error de firebase > Mensaje > " + error.message);
        });
}
//Login with Facebook
function facebookLoginWithFirebase() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        "display": "popup"
    })
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            console.log("login con Facebook exitoso")
        })
        .catch((error) => {
            console.log("Error de firebase > Código > " + error.code);
            console.log("Error de firebase > Mensaje > " + error.message);
        })
};

//Logout

window.logoutWithFirebase() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesion finalizada")
        })
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code)
            console.log("Error de Firebase > Mensaje > " + error.message)
        });
}