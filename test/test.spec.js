const assert = require("assert");
const facebookLoginWithFirebase = require("../src/js/login");//Llamo al archivo que quiero testear
const loginWithFirebase = require("../src/js/login");
const registerWithFirebase = require("../src/js/login");

describe("facebookLoginWithFirebase()", () =>{//Llamar a la función que quiero testear
    it ("Debe haber una funcion de logearse con facebook", () =>{
        assert.ok(facebookLoginWithFirebase);
    })
});
describe("loginWithFirebase()", () =>{
    it ("Debe haber una función de logearse con firebase", ()=>{
        assert.ok(loginWithFirebase);
    })
});
describe("registerWithFirebase()", () =>{
    it ("Debe haber una función de registrarse con firebase", ()=>{
        assert.ok(registerWithFirebase);
    })
})


