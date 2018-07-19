window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "index.html";
        }

        const myUsermail = firebase.auth().currentUser.providerData[0].email;
        const myUsername = firebase.auth().currentUser.displayName;

        console.log(myUsermail);
        console.log(myUsername);
        if (myUsername === null) {
            document.getElementById("myName").innerHTML = myUsermail;

        } else { document.getElementById("myName").innerHTML = myUsername; }
    });

}

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