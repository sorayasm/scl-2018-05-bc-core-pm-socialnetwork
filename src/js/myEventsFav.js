window.onload = () => {
      // para mostrar nombre y mail
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../index.html";
        }
        let myUserId = firebase.auth().currentUser.uid;
        myEvents(myUserId);
    });
};

// Mostrar mis eventos
function myEvents(myUserId){
    firebase.database().ref("eventos").orderByChild("creator").equalTo(myUserId)
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
                    <div class="col-6 col-lg-6 myEventName">
                        <h6>NOMBRE EVENTO</h6>
                        <h4>${newEventos.val().nameURL}</h4>   
                    </div>
                    <div class="col-6 col-lg-6 myDateEvent">
                        <h6>¿CUÁNDO?</h6>
                        <h5>${newEventos.val().dateURL}</h5>   
                    </div>
                    <div class="col-6 col-lg-6 myPublishedEvent">
                        <h6>DESCRIPCIÓN DEL EVENTO</h6>
                        <p>${newEventos.val().publicacionURL}</p>      
                    </div>
                    <div class="col-6 col-lg-6 myLikePublished">
                        <button class="cal" onclick="paintCalendar('${newEventos.key}')">
                            <i class="far fa-calendar-check" id="cora-${newEventos.key}"></i>
                        </button>
                    </div>
                </div>
                <div class="menuSeparador"></div>
            </div>
        ` + contenido.innerHTML;
        });
}

// Para pintar el corazon
function paintCalendar(key) {
    const heart = document.getElementById("cora-" + key);
    heart.classList.toggle('green');

};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
    let comments = document.getElementById('descEvento').value;
    document.getElementById('descEvento').value = '';
    document.getElementById('eventoName').value = '';
    document.getElementById('fechaEvento').value = '';
});

// Para validar texto
function validarTexto() {
    const entradaDeTexto = descEvento.value;
    if (!entradaDeTexto.replace(/\s/g, '').length) {
        alert("Tu mensaje no puede estar vacío")
    } else {
        sendText()
    }
};

// Para publicar texto
function sendText() {
    const dateEvento = fechaEvento.value;
    const nameEvento = eventoName.value;
    const textEvento = descEvento.value;
    const newTextKey = firebase.database().ref().child("eventos").push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`eventos/${newTextKey}`).set({
        publicacionURL: textEvento,
        nameURL: nameEvento,
        dateURL: dateEvento,
        creatorName: currentUser.displayName ||
            currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL
    });
};