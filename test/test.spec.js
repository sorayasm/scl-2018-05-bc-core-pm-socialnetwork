const assert = require("assert");
const loginWithFirebase = require("../src/js/login");//Llamo al archivo que quiero testear

describe("loginWithFirebase()", () =>{//Llamar a la función que quiero testear
    it ("Debe comprobar si la persona se logea en la app", () =>{
        assert.ok(loginWithFirebase("juanita@gmail.com", "1234567"), true);
    })
});

