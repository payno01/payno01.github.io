$(document).ready(function(){
    const form = document.querySelector("#formulario")
    const resultado = document.querySelector("#lista-resultados")
    const experiencias = JSON.parse(localStorage.getItem("experiencias"));
    
    $(form).keyup(function(){
        $(resultado).css("display", "block");
        resultado.innerHTML = "";
        let text =form.value.toLowerCase();
        if (text === ""){
            return;
        }
        for (key in experiencias){
            let exp = getFromStorage("experiencias", key)
            let turismo = exp.turismo.toLowerCase();
            let ubicacion = exp.ubicacion.toLowerCase();
            let title = exp.title.toLowerCase();
            let description = exp.description.toLowerCase();
            let autor = exp.collaborators[0].split("-")[1].toLowerCase();
            if (turismo.indexOf(text) != -1 || ubicacion.indexOf(text) != -1 || title.indexOf(text) != -1 || description.indexOf(text) != -1 || autor.indexOf(text) != -1){
                resultado.innerHTML += `<li class='${exp.id}' onclick='add_result(this)'>${title}</li>`
            }
        }
    });

    $("#crear-coleccion-boton").click(function(){
        let funcion = link => {alert("hola, buenas");}
        addLink(funcion)
    })

    $("#boton-añadir-coll").click(function(){
        $("#crear-coleccion-popup").addClass("active");
    })
})

$(".crear-coleccion-datos-campos").submit(function(ev){
    ev.preventDefault();
    if ($("#crear-coleccion-imagen").find("img")[0] === undefined){
        return alert("Debes introducir una imagen en la cabecera")
    }
    $("#crear-coleccion-popup").removeClass("active");
    $("#crear-coleccion-popup-2").addClass("active");
})

$("#volver-crear-coleccion").click(function(){
    $("#crear-coleccion-popup-2").removeClass("active");
    $("#crear-coleccion-popup").addClass("active");
})

$("#coleccion-add").click(function(){
    let f = link => {
        console.log(link)
        let exp = getFromStorage("experiencias", link)
        let html = `                        
        <div class="CLASE multimedia-frame">
        <div class="editar-imagen-container">
        <button onclick="editExperience(this)"><i class="fas fa-edit"></i></button>
        <button onclick="remove_experience(this)"><i class="fas fa-trash-alt"></i></button></div><div class="container-img"><img src=IMAGEN alt="" class="background-container"><div class = "img-in-container"><img src=IMAGEN></div></div></div>`
        for (i=0; i<2; i++){
            html = html.replace("IMAGEN", exp.portada);
        }
        html = html.replace("CLASE", exp.id);
        $("#crear-coleccion-multimedia-table").prepend(html);
    }
    addExperience(f);
})

function addExperience(a){
    $("#buscador-experiencia").addClass("active");
    $("#buscador-experiencia").data("function", a);
}

function editExperience(frame){
    let f = link => {
        let parent = $(frame).parents(".multimedia-frame")[0]
        let img = $(parent).find("img");
        for(var i = 0; i<img.length; i++){
            console.log($(img[i]))
            img[i].src = link;
        }
    }
    addExperience(f);
}

$("#experiencia-form").submit(function(ev){
    ev.preventDefault();
    $("#buscador-experiencia").removeClass("active");
    let func = $("#buscador-experiencia").data("function");
    let value = document.querySelector("#formulario").classList.item(0);
    func(value);
})

/* Crear objeto de la colección */
$("#crear-coleccion-multimedia-button").click(function(){
    let username = getCookie("user-logged").split(",")[1];
    let inputs = $(".crear-coleccion-datos-campos").find("input");
    let title = inputs[0].value;
    var cover = ""
    if ($(".crear-experiencia-imagen").find("img").length != 0){
        cover = $(".crear-experiencia-imagen").find("img")[0].src;
    }
    let description_container = $(".crear-coleccion-datos-campos").find("textarea")[0];
    let description = description_container.value;
    let gallery = $("#crear-coleccion-multimedia-table").children(".multimedia-frame");
    var experiences = [];
    for (var i = 0; i < gallery.length - 1; i++){
        experiences.push(gallery[i].classList.item(0));
    }
    collection = new Collection(username, title, cover, description);
    collection.experiences = experiences;
    addToStorage("colecciones", collection)
    let user = getUser("user-logged");
    user.colecciones.push(collection.id);
    addToStorage("users", user);
    localStorageHolder();
    $("#crear-coleccion-popup-2").removeClass("active");
    window.location.href = "perfil.html" 
})

function add_result(value){
    let clase = value.classList.item(0);
    let title = value.innerHTML;
    let form = document.querySelector("#formulario")
    form.classList.remove(form.classList.item(0));
    form.classList.add(clase);
    form.value = title;
    $("#lista-resultados").css("display", "none");
}