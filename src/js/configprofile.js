window.onload = () => {
    // para mostrar nombre y mail
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "index.html";
        }

    const myUsermail = firebase.auth().currentUser.providerData[0].email;
    const myUsername = firebase.auth().currentUser.displayName ;
    const myPicture = firebase.auth().currentUser.photoURL;

   
    console.log(myUsermail);
    console.log(myUsername);
    console.log(myPicture);
    if (myUsername===null){
        document.getElementById("myName").innerHTML=myUsermail;
        document.getElementById("imageInProfile").innerHTML=`<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
    }else{
        document.getElementById("myName").innerHTML=myUsername;
        document.getElementById("imageInProfile").innerHTML=`<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
    }

    });
};
function updateInfo() {
    const fotoValue = escogeUnaFoto.value;
    const nameValue = profileName.value;

    firebase.auth().createUserWithEmailAndPassword(nameValue, fotoValue)
        .then((userData) => {
            firebase.database().ref(`usuarios/${userData.user.uid}`).update({ //set guarda los valores (me serviría para guardar datos de una imagen)
                mail: userData.user.email, // guarda quien creo la solicitud de amistad
                uid: userData.user.uid, // persona asociada a la amistad (amigo 1)
                username: userData.user.email, //persona asociada a la amistad (amigo 2)
                photoUrl: "https://www.pekoda.com/images/default.png" //guarda imagen de perfil por defecto a cuenta creada por mail

            });
            console.log("usuario se creo"); // mail de confirmacion y login
            window.location = "confirmaccount.html";
        })
        .catch((error) => {
            console.log("Error de Firebase > Codigo > " + error.code); // alert error
            console.log("Error de Firebase > Mensaje > " + error.message);
            

        });
}