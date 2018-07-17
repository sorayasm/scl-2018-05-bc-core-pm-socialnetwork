// Ver si usuario esta logueado
window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        console.log("User > " + JSON.stringify(user));
    });
}

// Registro
function registerWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log("usuario se creo"); // mail de confirmacion y login
            window.location = "confirmaccount.html";
        })
        /*.then(() => {
            if (error# auth / weak - password) {
                console.log("registro fallo por password");
                document.getElementById("passwordLength").style.display = "block";
            }
        })*/
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code); // alert error
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
            window.location = "wall.html";
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
            console.log("login con Facebook exitoso");
            window.location = "wall.html";
        })
        .catch((error) => {
            console.log("Error de firebase > Código > " + error.code);
            console.log("Error de firebase > Mensaje > " + error.message);
        })
};

//Logout

function logoutWithFirebase() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesion finalizada")
            window.location = "index.html";
        })
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code)
            console.log("Error de Firebase > Mensaje > " + error.message)
        });
}


// Validacion de cuenta por correo electronico