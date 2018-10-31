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
            colEventName.innerHTML = `<h6>NOMBRE EVENTO</h6>
            <h4>${newEventos.val().nameURL}</h4>`;
            eventsRow2.appendChild(colEventName);

            const colEventDate = document.createElement("div");
            colEventDate.className = "col-4 col-lg-4 myDateEvent text-center";
            colEventDate.innerHTML = `<h6>¿CUÁNDO?</h6><h5>${newEventos.val().dateURL}</h5>`;
            eventsRow2.appendChild(colEventDate);

            const colEventPubl= document.createElement("div");
            colEventPubl.className = "col-8 col-lg-8 myPublishedEvent";
            colEventPubl.innerHTML = `<h6>DESCRIPCIÓN DEL EVENTO</h6>
            <textarea id="${newEventos.key}" class="col" style="height:auto" disabled>${newEventos.val().publicacionURL}</textarea>`;
            eventsRow2.appendChild(colEventPubl);

            const colEventButtons = document.createElement("div");
            colEventButtons.className = "col-4 col-lg-4 myLikePublished text-center";
            colEventButtons.innerHTML = `<button onclick="edit('${newEventos.key}')"><i class="far fa-edit"></i></button>
            <button class="cal" onclick="paintCalendar('${newEventos.key}')"><i class="far fa-calendar-check" id="cora-${newEventos.key}"></i></button>
            <button onclick="deleteText('${newEventos.key}')"><i class="far fa-trash-alt"></i></button>`;
            eventsRow2.appendChild(colEventButtons);

            const separador = document.createElement("div");
            separador.className = "menuSeparador";
            eventsDiv.appendChild(separador);
        });
};

// Para pintar el corazon
function paintCalendar(key) {
    const heart = document.getElementById("cora-" + key);
    heart.classList.toggle('green');

};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
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
        creatorName: currentUser.displayName || currentUser.providerData[0].email,
        creator: currentUser.uid,
        photoUrl: currentUser.photoURL
    });
};

// funcion borrar eventos
function deleteText(key) {
    swal({
            title: "¿Estás seguro que deseas eliminar este evento?",
            text: "Una vez borrado, no la podrás ver nunca más",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                firebase.database().ref(`eventos/${key}`).remove()
                const events = document.getElementById("evento-" + key);
                events.remove();
                swal("Poof! ¡Tu evento ha sido eliminado!", {
                    icon: "success",
                });
            } else {
                swal("¡Tu evento no se ha borrado!");
            }
        });

};


// Para editar eventos
function edit(key) {
    let input = document.getElementById(key);
    input.disabled = false;
    input.addEventListener("change", function() {
        firebase.database().ref(`eventos/${key}`)
        .update({ publicacionURL: input.value });
        input.disabled = true;
    })
};
