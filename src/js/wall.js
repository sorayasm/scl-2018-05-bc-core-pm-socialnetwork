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
        contenedorMensajes.innerHTML = `
        <img class="rounded-circle" src="${newPublicacion.val().photoURL}"></img>
        <p>${newPublicacion.val().creatorName}</p>
        <p>${newPublicacion.val().publicacionURL}</p>
       
        ` + contenedorMensajes.innerHTML;
    
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