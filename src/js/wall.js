window.onload = () => {
 // para mostrar nombre y mail
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../index.html";
        }}
    );
    getpost();
};

// Para mostrar los post
function getpost() {
    contenido.innerHTML = "";
    let posts = firebase.database().ref("publicaciones");
    posts.on("child_added", (newPublicacion) => {
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
        imgProfile.innerHTML =`<img width="60px" class="float-left img-circle rounded-circle" src="${newPublicacion.val().photoUrl || "https://www.pekoda.com/images/default.png"}"></img>`;
        publiCol2.appendChild(imgProfile);  

        const publiCol8 = document.createElement("div");
        publiCol8.className="col-8 myNameInpublications";
        publiCol8.innerHTML =`<p>${newPublicacion.val().creatorName}</p>`;
        publiRow.appendChild(publiCol8);

        const publiLikeDiv = document.createElement("div");
        publiLikeDiv.className = "col-2 text-right";
        publiLikeDiv.innerHTML = `<button onclick="paintHeart('${newPublicacion.key}')"><i class="far fa-heart" id="cora-${newPublicacion.key}"></i> ${newPublicacion.val().likes}</button>`;
        publiRow.appendChild(publiLikeDiv);

        const publiRow2 = document.createElement("div");
        publiRow2.className = "row";
        const colMyStatus = document.createElement("div");
        colMyStatus.className = "col-12 col-lg-12 myStatusPublished";
        colMyStatus.innerHTML = `<p>${newPublicacion.val().publicacionURL}</p>`;
        publiRow2.appendChild(colMyStatus);
        publiDiv.appendChild(publiRow2);

        const publiRow3 = document.createElement("div");
        publiRow3.className = "row";
        const dateCol = document.createElement("div");
        dateCol.className = "col myDatePublished";
        dateCol.innerHTML = `<p>${newPublicacion.val().date}</p>`
        publiRow3.appendChild(dateCol);
        publiDiv.appendChild(publiRow3);   

        const separator = document.createElement("div");
        separator.className = "menuSeparador";
        publiDiv.appendChild(separator);
        });
    }

// Para likes
function paintHeart(key) {
    let ref = firebase.database().ref(`publicaciones/${key}`)
    ref.once("value", (post) => {
        let postLikes = (post.val().likes) + 1;
        ref.update({ likes: postLikes });
    }) 
    getpost();
};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById("sendText");
boton.addEventListener("click", () => {
    document.getElementById("textArea").value = "";
});

// Para validar texto
function validarTexto() {
    const entradaDeTexto = textArea.value;
    if (!entradaDeTexto.replace(/\s/g, "").length) {
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
        creatorName: currentUser.displayName || currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL,
        date: new Date().toLocaleString(),
        likes: 0
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