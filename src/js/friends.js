window.onload= () => {

  contenedor.innerHTML = "";
  firebase.database().ref("usuarios")
      
      .on('child_added', (friendList) => {
          contenedor.innerHTML += `
             
              
              <p>${friendList.val().username}<p>
              
          `;
      });
}


