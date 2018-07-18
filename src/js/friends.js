/*function addFriend(friendUID) {// friendUID es mi amigo -  funcion solicitud amistad
  const newFriendKey = firebase.database().ref().child("amistades").push().key; //trae los hijos de amistades
  const currentUser = firebase.auth().currentUser;
  firebase.database().ref(`amistades/${newFriendKey}`).set({ //set guarda los valores (me serviría para guardar datos de una imagen)
      sentBy: currentUser.getUid(),// guarda quien creo la solicitud de amistad
      friend1: currentUser.getUid(), // persona asociada a la amistad (amigo 1)
      friend2: friendUID, //persona asociada a la amistad (amigo 2)
      isAccepted: 0 //esta aprobada la solicitud? (boolean)
  });
}

function approveFriend(friendKey){ //variable en html como cora
  const friends =  firebase.database().ref().child(`amistades/${friendKey}`).once('value') // amistades es la lista

  friends.isAccepted = 1;
  firebase.database().ref(`amistades/${friendKey}`).set(friends);
}

function removeFriend(friendKey){
  firebase.database().ref(`amistades/${friendKey}`).remove();
}

function getPendingFriendList(){
  return new Promise(function(resolve, reject) {
  listaPendientes = [];
  const currentUser = firebase.auth();
  firebase.database().ref().child("amistades/")
  .once("value")
  .then((amistades) => {
    amistades.forEach(function(amistad){
      amistad = amistad.val();
      if((amistad.friend1 == currentUser.getUid() || amistad.friend2 == currentUser.getUid() ) 
      && (amistad.sentBy != currentUser.getUid() && amistad.isAccepted == 0)){
                listaPendientes.push(amistad);
        }
    })
    resolve(listaPendientes); // array
    })
  })
}

function getCurrentFriendList(){
  return new Promise(function(resolve, reject) {
    let listaPendientes = [];
    const currentUser = firebase.auth();
    firebase.database().ref("amistades").once("value")
    .then((amistades) =>{
      amistades.forEach(function(amistad){
        amistad = amistad.val();
        if((amistad.friend1 == currentUser.getUid() || amistad.friend2 == currentUser.getUid() ) 
            && amistad.isAccepted == 1){
                listaPendientes.push(amistad);
        }
    })
    resolve(listaPendientes); // array
    })
  })
}

function imprimirAmigosPendientes(){
  let html="";
  getPendingFriendList().then((lista)=>{
    lista.forEach(element => {
      getDatosAmigo(element.friend1).then(function(res){
        getDatosAmigo(element.friend1).then(function(res2){
          if(res){
            html+=`<p>${res.username}</p>`
          }else {
            html+=`<p>ERROR DE DATOS</p>`
          }
          if(res2){
            html+=`<p>${res2.username}</p>`
          }else {
            html+=`<p>ERROR DE DATOS</p>`
          }
          html+=`<p>holi holi</p>`
          document.getElementById('listadoAmigosPendientes').innerHTML = html;
        })
      })
      
  });
})
}

function getDatosAmigo(uid){
  return new Promise(function(resolve, reject) {
    const currentUser = firebase.auth();
    firebase.database().ref("usuarios/"+uid).once("value").then(function(usuarios){
      usuarios.forEach(function(usr){
        if(usr.uid == uid) {
          resolve(usr);
        }
      })
      resolve(null);
    })
  })
}

window.onload  = () => {
  const currentUser = firebase.auth().currentUser;
  imprimirAmigosPendientes();
};*/