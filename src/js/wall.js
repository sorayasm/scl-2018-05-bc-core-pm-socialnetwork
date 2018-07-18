window.onload = () => {
    //Base de datos para consultar 1 vez
    firebase.database().ref("publicaciones")
        .once("value")
        .then((publicaciones) => {
            console.log("Publicaciones >" + JSON.stringify(publicaciones))
        })
        .catch((error) => {
            console.log("Database error >" + error);
        });
    //Base de datos para consultar MAS veces
    firebase.database().ref("publicaciones")
        .on("child_added", (newPublicacion) => {
            contenido.innerHTML = `
            <div id="publicacion-${newPublicacion.key}">
                <div class="row myPublishedData">
                    <div class="col ">
                        <div class="imageInProfileMessage">
                        </div>
                    </div>
                    <div class="col-6 myNameInpublications">
                        <p>${newPublicacion.val().creatorName}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-8 myStatusPublished">
                        <p>${newPublicacion.val().publicacionUrl}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
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
const boton = document.getElementById('sendText');
//Para que al publicar se borre lo escrito en text área
boton.addEventListener('click', () => {
    let comments = document.getElementById('textArea').value;
    document.getElementById('textArea').value = '';
});

function paintHeart(key) {
    const heart = document.getElementById("cora-" + key);
    heart.classList.toggle('green');

}


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