
/*//Agregar comentarios al local storage
function agregarComentariosLocalStorage(mensaje){
    let texto;
    texto = obtenerComentariosLocalStorage();
    texto.push(mensaje);
    localStorage.setItem("mensajes", JSON.stringify(texto));
}

//Comprobar que existan elementos en el local storage
function obtenerComentariosLocalStorage(){
    let texto;
    if(localStorage.getItem("mensajes") === "null"){
        texto = [];
    }else{
        texto.JSON.parse(localStorage.getItem("texto"));
    }
    return texto;
}

//eliminar texto del local storage


//Generar elementos con DOM
function elementosDom(mensajeRecibido){

    //Creando elementos
    //Imagen perfil, nombre, fecha y basurero de borrar
    const itemProfile = document.createElement("div");
    let imagenPerfil = document.createElement("img");
    const nombrePersona = document.createElement("h3");
    const fpublishedDate = document.createElement("h4");
    const botonBorrar = document.createElement("i");
    trash.classList.add('fa', 'fa-trash', 'trash');
    //Comentario y corazón
    const itemText = document.createElement("div");
    const parrafo = document.createElement("p");
    const textMensaje = document.createTextNode(mensajeRecibido);
    const botonMeGusta = document.createElement("i");
    botonMeGusta.classList.add('fa', 'fa-heart', 'heart');
    


    //Añadir clases a los elementos
    parrafo.setAttribute("class", "d-inline-block");

    //Añade texto al boton
    bot
}
*/

window.onload = () =>{
    //Base de datos para consultar 1 vez
    firebase.database().ref("publicaciones")
    .once("value")
    .then((publicaciones) => {
        console.log("Publicaciones >" +JSON.stringify(publicaciones))
    })
    .catch((error) =>{
        console.log("Database error >" +error);
    });
    //Base de datos para consultar MAS veces
    firebase.database().ref("publicaciones")
    .on("child_added", (newPublicacion)=>{
        contenido.innerHTML = `
        <div class="row myPublishedData">
            <div class="col ">
                <div class="imageInProfileMessage">
                    <img class="float-left" src="${newPublicacion.val().photoURL}"></img>
                </div>
            </div> 
            <div class="col-6 myNameInpublications">
                <p>${newPublicacion.val().creatorName}</p>
            </div>
            <div class="col trashIcon text-right">
                <i class="far fa-trash-alt"></i>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-8 myStatusPublished">
                <p>${newPublicacion.val().publicacionURL}</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <i class="far fa-heart"></i>
            </div>
        </div>
        <div class="menuSeparador"></div>
        ` + contenido.innerHTML;
    });
    
};

function sendText(){
    const textValue = textArea.value;

    const newTextKey = firebase.database().ref().child("publicaciones").push().key;
    const currentUser = firebase.auth().currentUser;
    
    firebase.database().ref(`publicaciones/${newTextKey}`).set({
        publicacionURL : textValue,
        creatorName : currentUser.displayName ||
                      currentUser.providerData[0].email,
        creator : currentUser.uid,
        photoUrl : currentUser.photoURL
    });
}