window.onload = () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../index.html";
        }
    });
    getEvents();
};

// Para mostrar los eventos 
function getEvents(){
    //Base de datos para consultar MAS veces
    firebase.database().ref("eventos")
        .on("child_added", (newEventos) => {
            const eventsDiv = document.createElement("div");
            eventsDiv.id=`evento-${newEventos.key}`;
            contenido.appendChild(eventsDiv);

            const eventsRow = document.createElement("div");
            eventsRow.className = "row myPublishedData";
            eventsDiv.appendChild(eventsRow);

            const eventsCol2 = document.createElement("div");
            eventsCol2.className = "col-2 myPublishedPhoto";
            eventsRow.appendChild(eventsCol2);

            const imgProfileMsn = document.createElement("div");
            imgProfileMsn.className = "imageInProfileMessage";
            imgProfileMsn.innerHTML = `<img width="60px" class="float-left img-circle rounded-circle" src="${newEventos.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>`;
            eventsCol2.appendChild(imgProfileMsn);

            const eventsCol10 = document.createElement("div");
            eventsCol10.className = "col-10 myNameInpublications";
            eventsCol10.innerHTML = `<p>${newEventos.val().creatorName}</p>`
            eventsRow.appendChild(eventsCol10);

            const eventsRow2 = document.createElement("div");
            eventsRow2.className = "row";
            eventsDiv.appendChild(eventsRow2);

            const colEventName = document.createElement("div");
            colEventName.className = "col-8 col-lg-8 myEventName";
            colEventName.innerHTML = `<h6>NOMBRE EVENTO</h6><h4>${newEventos.val().nameURL}</h4><br>`;
            eventsRow2.appendChild(colEventName);

            const colEventDate = document.createElement("div");
            colEventDate.className = "col-4 col-lg-4 myDateEvent text-center";
            colEventDate.innerHTML = `<h6>¿CUÁNDO?</h6><h5>${newEventos.val().dateURL}</h5>`;
            eventsRow2.appendChild(colEventDate);

            const colEventPubl= document.createElement("div");
            colEventPubl.className = "col-8 col-lg-8 myPublishedEvent";
            colEventPubl.innerHTML = `<h6>DESCRIPCIÓN DEL EVENTO</h6><p>${newEventos.val().publicacionURL}</p><br>`;
            eventsRow2.appendChild(colEventPubl);

            const colEventLike = document.createElement("div");
            colEventLike.className = "col-4 col-lg-4 myLikePublished text-center";
            colEventLike.innerHTML = `<button class="cal" onclick="paintCalendar('${newEventos.key}')"><i class="far fa-calendar-check" id="cora-${newEventos.key}"></i></button>`;
            eventsRow2.appendChild(colEventLike);

            const separador = document.createElement("div");
            separador.className = "menuSeparador";
            eventsDiv.appendChild(separador);
        });
}

// Para pintar el corazón
function paintCalendar(key) {
    const heart = document.getElementById("cora-" + key);
    heart.classList.toggle('green');

};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
    let comments = document.getElementById('descEvent').value;
    document.getElementById('descEvent').value = '';
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
});

// Para validar texto
function validarTexto() {
    const entradaDeTexto = descEvent.value;
    if (!entradaDeTexto.replace(/\s/g, '').length) {
        alert("Tu mensaje no puede estar vacío")
    } else {
        sendText()
    }
};

// Para publicar texto
function sendText() {
    const dateEvent = eventDate.value;
    const nameEvent = eventName.value;
    const textEvent = descEvent.value;
    const newTextKey = firebase.database().ref().child("eventos").push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`eventos/${newTextKey}`).set({
        publicacionURL: textEvent,
        nameURL: nameEvent,
        dateURL: dateEvent,
        creatorName: currentUser.displayName ||
            currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL
    });
};

