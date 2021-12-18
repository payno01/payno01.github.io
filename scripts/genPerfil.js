$(document).ready(function() {
    let user = getUser("perfil-generator")

    document.getElementById("path").innerHTML += 
    `<p><a href = "index.html">Inicio</a>/<a href = "perfil.html">${user.name}</a></p>`
    document.getElementById("usuario_container").innerHTML +=  
    `<div id="foto-usuario" class=" ${user.id} perfil-logo">
        <img id="img-usuario" src=${user.photo} alt="exp-1">
    </div>
    <div id="datos-usuario">
        <h2>@${user.name}</h2>
        <div id="num-publi-mg">
            <p><b>${user.experiencias.length}  </b>publicaciones</p>
            <p id = "total-mg"><b>${mgCounter(user)}</b> me gusta <i class="fas fa-heart"></i></p>
        </div>
        <p>${user.mail}</p>
        <button onclick = "mostrar_coleccion(this)" id = "colecciones_button" class = "${user.id} stylebutton">Colecciones</button>
    </div>` 

    if (user.experiencias.length == 0){
        document.getElementById("experiencias-usuario-container").innerHTML +=
        
            `<h1 class="user-sin-exp"> ${user.name} no ha publicado ninguna experiencia </h1>
            <img alt=":("class="user-img-sin-exp" src = "https://st2.depositphotos.com/1967477/6346/v/600/depositphotos_63462971-stock-illustration-sad-smiley-emoticon-cartoon.jpg">`
    }
    else{
        for(var i = 0; i < user.experiencias.length; i++ ){
            var experiencia = getFromStorage("experiencias",user.experiencias[i]) 
            document.getElementById("experiencias-usuario-container").innerHTML +=
            `<div onclick = genExp_pop(event) class="${experiencia.id} exp-usuario">
                <img alt="${experiencia.id}"src = ${experiencia.portada}>
            </div>`   
        }
    }


}) 

function mostrar_coleccion(object){
    let user = object.classList.item(0);
    showPopUp("#Colecciones-pop-up");
    abrirColecciones(user);
}


