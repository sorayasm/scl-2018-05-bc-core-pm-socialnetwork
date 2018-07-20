window.onload = () => {
    // para mostrar nombre y mail
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "index.html";
        }

        const myUsermail = firebase.auth().currentUser.providerData[0].email;
        const myUsername = firebase.auth().currentUser.displayName;
        const myPicture = firebase.auth().currentUser.photoURL;
        const myUserId = firebase.auth().currentUser.uid;


        console.log(myUsermail);
        console.log(myUsername);
        console.log(myPicture);
        console.log(myUserId);

        if (myUsername === null) {
            document.getElementById("myName").innerHTML = myUsermail;
            document.getElementById("imageInProfile").innerHTML = `<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
        } else {
            document.getElementById("myName").innerHTML = myUsername;
            document.getElementById("imageInProfile").innerHTML = `<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
        }
    });

    //Base de datos
    firebase.database().ref("publicaciones")
        .on("child_added", (newPublicacion) => {

            //const wall = newPublicacion.val().creator;
            //console.log(wall)

            contenido.innerHTML = `
            <div id="publicacion-${newPublicacion.key}">
                <div class="row myPublishedData">
                    <div class="col-2 myPublishedPhoto ">
                        <div class="imageInProfileMessage">
                        <img width="60px" class="float-left img-circle" src="${newPublicacion.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>
                        </div>
                    </div>
                    <div class="col-8 myNameInpublications">
                        <p>${newPublicacion.val().creatorName}</p>
                    </div>
                    <div class="col-2 trashIcon text-right">
                        <button onclick="deleteText('${newPublicacion.key}')">
                            <i class="far fa-trash-alt"></i>
                        </button>
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
module.exports = validarTexto;

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
};

// funcion borrar publicaciones
function deleteText(key) {
    swal({
            title: "¿Estás seguro que deseas eliminar esta publicación?",
            text: "Una vez borrado, no la podrás ver nunca más",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                firebase.database().ref(`publicaciones/${key}`).remove()
                const publi = document.getElementById("publicacion-" + key);
                publi.remove();
                swal("Poof! ¡Tu comentario ha sido eliminado!", {
                    icon: "success",
                });
            } else {
                swal("¡Tu comentario no se ha borrado!");
            }
        });
}