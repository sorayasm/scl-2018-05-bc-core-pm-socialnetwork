window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../../index.html";
        }
    });
}

//Logout

function logoutWithFirebase() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesión finalizada")
            window.location = "../../index.html";
        })
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code)
            console.log("Error de Firebase > Mensaje > " + error.message)
        });
}