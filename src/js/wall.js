window.onload = () => {
    firebase.database().ref("publicaciones")
        .on("child_added", (newPublicacion) => {
            contenido.innerHTML = `
            <div id="publicacion-${newPublicacion.key}">
                <div class="row myPublishedData">
                    <div class="col-2 myPublishedPhoto ">
                        <div class="imageInProfileMessage">
                        <img width="60px" class="float-left img-circle" src="${newPublicacion.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>
                        </div>
                    </div>
                    <div class="col-10 myNameInpublications">
                        <p>${newPublicacion.val().creatorName}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-12 myStatusPublished">
                        <p>${newPublicacion.val().publicacionURL}</p>      
                    </div>
                </div>
                <div class="row">
                    <div class="col myLikePublished">
                        <button onclick="paintHeart('${newPublicacion.key}')">
                            <i class="far fa-heart" id="cora-${newPublicacion.key}"></i>
                        </button>
                    </div>
                </div>
                <div class="menuSeparador"></div>
            </div>
   
        ` + contenido.innerHTML;
        });

};

// Para pintar el corazon
function paintHeart(key) {
    const heart = document.getElementById("cora-" + key);
    heart.classList.toggle('green');

}

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
    let comments = document.getElementById('textArea').value;
    document.getElementById('textArea').value = '';
});

// Para validar texto
function validarTexto() {
    const entradaDeTexto = textArea.value;
    if (!entradaDeTexto.replace(/\s/g, '').length) {
        alert("Tu mensaje no puede estar vacío")
    } else {
        sendText()
    }
};

// Para publicar texto
function sendText() {
    const textValue = textArea.value;
    const newTextKey = firebase.database().ref().child("publicaciones").push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`publicaciones/${newTextKey}`).set({
        publicacionURL: textValue,
        creatorName: currentUser.displayName ||
            currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL
    });
}

//Logout
function logoutWithFirebase(){
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
module.exports = validarTexto;