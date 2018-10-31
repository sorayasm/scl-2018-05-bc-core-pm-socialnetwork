window.onload = () => {

    // para mostrar nombre y mail
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../index.html";
        }
        const myUsermail = firebase.auth().currentUser.providerData[0].email;
        const myUsername = firebase.auth().currentUser.displayName;
        const myPicture = firebase.auth().currentUser.photoURL;
        let myUserId = firebase.auth().currentUser.uid;
        printWall(myUserId);

        if (myUsername === null) {
            document.getElementById("myName").innerHTML = myUsermail;
            document.getElementById("imageInProfile").innerHTML = `<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
        } else {
            document.getElementById("myName").innerHTML = myUsername;
            document.getElementById("imageInProfile").innerHTML = `<img class="imageInProfile" src="${myPicture || 'https://www.pekoda.com/images/default.png'}"></img>`;
        }
    });
};

// Para imprimir el Muro
function printWall(myUserId) {
    // consultar base de datos
    firebase.database().ref("publicaciones").orderByChild("creator").equalTo(myUserId)
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
            imgProfile.className="imageInProfileMessage rounded";
            imgProfile.innerHTML =`<img width="60px" class="float-left img-circle rounded-circle" src="${newPublicacion.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>`;
            publiCol2.appendChild(imgProfile);  
            
            const publiCol8 = document.createElement("div");
            publiCol8.className="col-8 myNameInpublications";
            publiCol8.innerHTML =`<p>${newPublicacion.val().creatorName}</p>`;
            publiRow.appendChild(publiCol8);

            const publiButtonsDiv = document.createElement("div");
            publiButtonsDiv.className = "col-2 trashIcon text-right";
            publiButtonsDiv.innerHTML = `<button onclick="edit('${newPublicacion.key}')"><i class="far fa-edit"></i></button>
            <button onclick="paintHeart('${newPublicacion.key}')"><i class="far fa-heart" id="cora-${newPublicacion.key}"></i></button>
            <button onclick="deleteText('${newPublicacion.key}')"><i class="far fa-trash-alt"></i></button>
            `;
            publiRow.appendChild(publiButtonsDiv);

            const publiRow2 = document.createElement("div");
            publiRow2.className = "row";
            const colMyStatus = document.createElement("div");
            colMyStatus.className = "col-12 col-lg-12 myStatusPublished";
            colMyStatus.innerHTML = `<textarea id="${newPublicacion.key}" class="col" style="height:auto" disabled>${newPublicacion.val().publicacionURL}</textarea>`;
            publiRow2.appendChild(colMyStatus);
            publiDiv.appendChild(publiRow2);

            const publiRow3 = document.createElement("div");
            publiRow3.className = "row";
            const dateCol = document.createElement("div");
            dateCol.className = "col myLikePublished";
            dateCol.innerHTML = `<p>${newPublicacion.val().date}</p>`
            publiRow3.appendChild(dateCol);
            publiDiv.appendChild(publiRow3);   

            const separator = document.createElement("div");
            separator.className = "menuSeparador";
            publiDiv.appendChild(separator);
    });
}


// Para pintar el corazón
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
        photoUrl: currentUser.photoURL,
        date: new Date().toLocaleString()
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

// Para editar post
function edit(key) {
    let input = document.getElementById(key);
    input.disabled = false;
    input.addEventListener("change", function() {
        firebase.database().ref(`publicaciones/${key}`).update({ publicacionURL: input.value });
        input.disabled =true;
    });
}