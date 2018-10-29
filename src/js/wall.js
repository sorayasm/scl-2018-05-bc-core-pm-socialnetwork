window.onload = () => {
    firebase.database().ref("publicaciones")
        .on("child_added", (newPublicacion) => {
            const publiDiv = document.createElement("div");
            publiDiv.id=`publicacion-${newPublicacion.key}`;
            contenido.appendChild(publiDiv);   

            const publiRow =document.createElement("div");
            publiRow.className="row myPublishedData";
            publiDiv.appendChild(publiRow);

            const publiCol2 = document.createElement("div");
            publiCol2.className="col-2 myPublishedPhoto";
            publiRow.appendChild(publiCol2);

            const imgProfile = document.createElement("div");
            imgProfile.className="imageInProfileMessage";
            imgProfile.innerHTML =`<img width="60px" class="float-left img-circle" src="${newPublicacion.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>`;
            publiCol2.appendChild(imgProfile);  
            
            const publiCol8 = document.createElement("div");
            publiCol8.className="col-8 myNameInpublications";
            publiCol8.innerHTML =`<p>${newPublicacion.val().creatorName}</p>`;
            publiRow.appendChild(publiCol8);

            const publiTrashDiv = document.createElement("div");
            publiTrashDiv.className = "col-2 trashIcon text-right";
            // publiTrashDiv.innerHTML = `<button onclick="deleteText('${newPublicacion.key}')"><i class="far fa-trash-alt"></i></button>`;
            publiRow.appendChild(publiTrashDiv);

            const publiRow2 = document.createElement("div");
            publiRow2.className = "row";
            const colMyStatus = document.createElement("div");
            colMyStatus.className = "col-12 col-lg-12 myStatusPublished";
            colMyStatus.innerHTML = `<p>${newPublicacion.val().publicacionURL}</p>`;
            publiRow2.appendChild(colMyStatus);
            publiDiv.appendChild(publiRow2);

            const publiRow3 = document.createElement("div");
            publiRow3.className = "row";
            const myLikeCol = document.createElement("div");
            myLikeCol.className = "col myLikePublished";
            myLikeCol.innerHTML = `<button onclick="paintHeart('${newPublicacion.key}')"><i class="far fa-heart" id="cora-${newPublicacion.key}"></i></button>`
            publiRow3.appendChild(myLikeCol);
            publiDiv.appendChild(publiRow3);   

            const separator = document.createElement("div");
            separator.className = "menuSeparador";
            publiDiv.appendChild(separator);
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