function sendInfo() {
    const nameValue = profileName.value;
    const descrValue = profileDescr.value;
    const dateOfBirthValue = DateOfBirth.value;

    const photoFile = photoFileSelector.files[0];
    const fileName = photoFile.name;
    const metadata = {
        contentType: photoFile.type
    };


    const newProfileInfo = firebase.database().ref().child("profiles").push().key;
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`profiles/${newProfileInfo}`).set({
        name: nameValue,
        creatorEmail: currentUser.displayName || currentUser.providerData[0].email,
        creatorDescr: descrValue,
        creatorBirth: dateOfBirthValue,
        creatorPhoto: photoFile
    });
}