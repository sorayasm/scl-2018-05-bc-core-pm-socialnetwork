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
                    <img class="float-left" src="${newPublicacion.val().photoUrl}"></img>
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
                <i class="fa fa-heart" id="corazon" onclick='paintHeart()'></i>
                
            </div>
        </div>
        <div class="menuSeparador"></div>
        ` + contenido.innerHTML;
    });
    
};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
    let comments = document.getElementById('textArea').value;
    document.getElementById('textArea').value = '';
});
 function paintHeart(e){
    const heart = document.getElementById('corazon');
    if(e.target.id === heart){
        e.target.toggle("green");
    }

};

/*function paintHeart(){
    const heart = document.getElementById('corazon');
    
    heart.classList.toggle('green');
};*/
    

/*const heart = document.getElementById("corazon");
heart.addEventListener('click', () =>{
    heart.classList.toggle('green');
});*/

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
