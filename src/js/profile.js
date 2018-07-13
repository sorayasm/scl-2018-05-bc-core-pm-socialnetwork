//Agregar comentarios al local storage
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
    const itemMensaje = document.createElement("div");
    const parrafo = document.createElement("p");
    const textMensaje = document.createTextNode(mensajeRecibido);
    const botonBorrar = document.createElement("i");
    const botonMeGusta = document.createElement("i");


    //Añadir clases a los elementos
    parrafo.setAttribute("class", "")
}