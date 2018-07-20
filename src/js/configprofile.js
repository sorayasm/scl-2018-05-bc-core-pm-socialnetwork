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


/*function updateInfo(){
    let actualizarInfo = {
        myUsermail : firebase.auth().currentUser.providerData[0].email,
        myUsername : firebase.auth().currentUser.displayName,
        myPicture : firebase.auth().currentUser.photoURL
    }

    let newName = profileName.value;
    let newPicture = escogeUnaFoto.value;
    let updates = {};
  updates['/profiles/' + myUsername] = actualizarInfo;
  updates['/profiles/' + myPicture] = actualizarInfo;

  return firebase.database().ref().update(updates);
}

function sendInfo() {
    const nameValue = profileName.value;
    const descrValue = profileDescr.value;
    const dateOfBirthValue = DateOfBirth.value;
    const photoURL = escogeUnaFoto.files[0];;

    const newProfileInfo = firebase.database().ref().child("profiles").push().key;
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`profiles/${newProfileInfo}`).set({
        name: nameValue,
        creatorEmail: currentUser.displayName || currentUser.providerData[0].email,
        creatorDescr: descrValue,
        creatorBirth: dateOfBirthValue,
        photoUrl: photoURL
        
       // creatorPhoto: photoFile
    });
    console.log(photoUrl);
};
function sendPhoto(){
    const imageValue = imageInProfile.value;

    const newPhotoKey = firebase.database().ref().child("fotoUrl").push().key; //key permite que se generen llaves nuevas para guardar los gif 
    const currentUser = firebase.auth().currentUser; //Si estamos logueados, siempre podremos acceder a los datos, en este caso, a los gif
    firebase.database().ref(`fotoUrl/${newPhotoKey}`).set({
        photoURL : imageValue, 
        creatorName : currentUser.displayName,/* ||
                      currentUser.providerData[0].email 
        creator : currentUser.uid
    });
}

function updateInfo(){
    var updates = {};
  updates['/profiles/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}*/


/*function agregarFotoLoaclStoragre(foto){
    let fotoPerfil;
    fotoPerfil = obtenerFotoLocalStorage();
    fotoPerfil.push(foto);
    localStorage.setItem("fotoPerfil", JSON.stringify(fotoPerfil));

};

function obtenerFotoLocalStorage(){
    let fotoPerfil;
    if(localStorage.getItem("fotoPerfil") === "null"){
        fotoPerfil = [];
    }else{
        fotoPerfil = JSON.parse(localStorage.getItem("fotoPerfil"));
    }
    return fotoPerfil;
}

function borrarFotosLocalStorage(foto){
    let foto, borrarfoto;
    borrarfoto = foto.substring(0, foto.length);
    fotos = obtenerFotoLocalStorage();
    fotos.forEach(function(fotoArr, index){
        if(borrarfoto === fotoArr){
            fotos.splice(index,1);
        }
    })
    localStorage.setItem("fotoPerfil", JSON.stringify(fotos));

}

const fotoP = document.getElementById("imageInProfile");

eventListener();

function eventListener(){
    document.getElementById("sendPhoto").addEventListener("click", agregarFoto);
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

function agregarFoto(){
    const foto = document.getElementById("inputGroupFile02").value;
    agregarFotoLoaclStoragre(foto);

}

function localStorageListo(){
    let fotos;
    fotos = obtenerFotoLocalStorage();
    fotos.forEach(function(fotoPerfil){
        fotoPerfil.setItem(fotoP);
    })
}

function agregarFotoLoaclStoragre(fotoPerfil){
    let foto;
    foto = obtenerFotoLocalStorage();
    foto.push(fotoPerfil);
    localStorage.setItem("fotoPerfil", JSON.stringify(foto));

}*/

