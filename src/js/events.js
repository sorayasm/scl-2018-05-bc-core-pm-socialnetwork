window.onload = () => {
    //Base de datos para consultar 1 vez
    firebase.database().ref("eventos")
        .once("value")
        .then((eventos) => {
            console.log("eventos >" + JSON.stringify(eventos))
        })
        .catch((error) => {
            console.log("Database error >" + error);
        });
    //Base de datos para consultar MAS veces
    firebase.database().ref("eventos")
        .on("child_added", (newEventos) => {
            contenido.innerHTML = `
            <div id="publicacion-${newEventos.key}">
                <div class="row myPublishedData">
                    <div class="col-2 myPublishedPhoto ">
                        <div class="imageInProfileMessage">
                        <img width="60px" class="float-left img-circle" src="${newEventos.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>
                        </div>
                    </div>
                    <div class="col-10 myNameInpublications">
                        <p>${newEventos.val().creatorName}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-12 myStatusPublished">
                        <p>${newEventos.val().publicacionURL}</p>      
                    </div>
                </div>
                <div class="row">
                    <div class="col myLikePublished">
                        <button onclick="paintCalendar('${newEventos.key}')">
                            <i class="far fa-calendar-check" id="cora-${newEventos.key}"></i>
                        </button>
                    </div>
                </div>
                <div class="menuSeparador"></div>
            </div>
   
        ` + contenido.innerHTML;
        });

};

// Para pintar el corazon
function paintCalendar(key) {
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
    const newTextKey = firebase.database().ref().child("eventos").push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`eventos/${newTextKey}`).set({
        publicacionURL: textValue,
        creatorName: currentUser.displayName ||
            currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL
    });
}