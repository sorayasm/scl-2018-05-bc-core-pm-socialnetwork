window.onload= () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            window.location = "../index.html";
        }
    });

  contenedor.innerHTML = "";
    firebase.database().ref("usuarios")
        
        .on('child_added', (friendList) => {
            contenedor.innerHTML += `
                
            <div class="row myPublishedData whContainer ">
            <div class="col-2 myPublishedPhoto ">
                <div class="imageInProfileMessage">
                <img width="60px" class="float-left img-circle" src="${friendList.val().photoUrl || 'https://www.pekoda.com/images/default.png'}"></img>
                </div>
            </div>
            <div class="col-6 myNameInpublications">
                <p>${friendList.val().username}</p>
            </div>

            <div class="col-1">
                <div>
                <i class="far fa-times-circle btnDeleteFriend"></i>
                </div>
        </div>
                
                
            `;
        });
}


