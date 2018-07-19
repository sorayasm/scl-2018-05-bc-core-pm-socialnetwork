// Registro
function registerWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((userData) => {
            firebase.database().ref(`usuarios/${userData.user.uid}`).set({ //set guarda los valores (me serviría para guardar datos de una imagen)
                mail: userData.user.email, // guarda quien creo la solicitud de amistad
                uid: userData.user.uid, // persona asociada a la amistad (amigo 1)
                username: userData.user.email, //persona asociada a la amistad (amigo 2)
                photoUrl: "https://www.pekoda.com/images/default.png" //guarda imagen de perfil por defecto a cuenta creada por mail

            });
            console.log("usuario se creo"); // mail de confirmacion y login
            sendSignInLinkToEmail
            window.location = "confirmaccount.html";
        })
        .catch((error) => {
            alert("Revisa todos los datos ingresados. La contraseña debe tener al menos 6 caracteres.");
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
            alert("Revisa todos los datos ingresados. Correo y contraseña son obligatorios.");
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
            alert("Revisa todos los datos ingresados. Hubo un problema con el registro de Facebook.");
        })
};


// Validacion de cuenta por correo electronico
/*firebase.auth().sendSignInLinkToEmail(emailValue, actionCodeSettings)
    .then(function() {
        window.location = "confirmaccount.html";
        const emailValue = email.value;
        window.localStorage.setItem('emailForSignIn', emailValue);
    })
    .catch(function(error) {
        console.log("Error de firebase > Código > " + error.code);
        console.log("Error de firebase > Mensaje > " + error.message);
    });

 const actionCodeSettings = {
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        }
      };*/