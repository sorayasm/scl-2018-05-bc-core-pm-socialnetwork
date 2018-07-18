function sendInfo() {
    const nameValue = profileName.value;
    const descrValue = profileDescr.value;
    const dateOfBirthValue = DateOfBirth.value;

    const newProfileInfo = firebase.database().ref().child("profiles").push().key;
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`profiles/${newProfileInfo}`).set({
        name: nameValue,
        creatorEmail: currentUser.displayName || currentUser.providerData[0].email,
        creatorDescr: descrValue,
        creatorBirth: dateOfBirthValue,
       // creatorPhoto: photoFile
    });
}

function agregarFotoLoaclStoragre(foto){
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

}

