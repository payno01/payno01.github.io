function genExp_pop(event){
    $(".overlay").show()
    $("#experiencias-pop-up").addClass("active")
    let experiencia = getFromStorage("experiencias",event.target.classList.item(0))
    let owner = getFromStorage("users", experiencia.collaborators[0])
    console.log(owner)
    document.getElementById("content-left").innerHTML = 
    
    `<div class="content-top-left">
        <div class="perfil-experiencias">
            <a href = "perfil.html" onclick = "localStorageHolder(); genCookie(event)" class="${owner.id} perfil-logo">
                <img src=${owner.photo} alt="">
            </a>
            <div class="user-name-exp"><h2>${owner.name}</h2><h3>${experiencia.ubicacion}</h3><h3 class="tipo-turismo">${experiencia.turismo}</h3></div>
        </div>
        <div class="mas-opciones-container">
            <div class = "${experiencia.id} mas-opciones" onclick = "showOptionsExperience(event)"><i class="fas fa-ellipsis-h"></i></div>
        </div>
    </div>
    <div class="container-img">
        <img src=${experiencia.portada} alt="" class="background-container">
        <div class = "img-in-container"><img src=${experiencia.portada}></div>
    </div>
    <div class="mg-container">
        <div id = "heart-container" draggable = "false" onclick = darMeGusta(event) class="${experiencia.id} img-mg">
            <img src="images/corazon-mg2.png" alt="corazon rojo" id="corazon-blanco">
            <img src="images/corazon-mg.png" alt="corazon blanco" id="corazon-rojo">
        </div>
        <div id = "cantidad-mg" class="cantidad-mg">
            <h2>${experiencia.mg} Me gusta</h2>
        </div>
        <div id="compartir-boton" class="compartir-boton img-mg" onclick = mostrar_compartir()>
            <img src="images/compartir.png" alt="">
        </div>
    </div>`
    if (getCookie("user-logged") != ""){
        if(userNotMged(experiencia) == false){
            document.getElementById("corazon-rojo").style.transform = "scale(1)"
        }
    }
 


    document.getElementById("carousel-exp-pop-up").innerHTML = ""
    for (var i = 0;  i < experiencia.gallery.length; i++ ){
        document.getElementById("carousel-exp-pop-up").innerHTML += 
                `<div class="carousel-item">
                    <img src= ${experiencia.gallery[i]}>
                </div>`
        }        
    

    document.getElementById("description-exp-pop-up").innerHTML = 
        `<h2>${experiencia.title}</h2>
        <div class="p-description-exp-pop-up">
            <p> ${experiencia.description}</p>
        </div>`


}

function showOptionsExperience(event){
    let exp = getFromStorage("experiencias", event.target.classList.item(0)) 
    let user = getCookie("user-logged").split(",")[1]
    if (exp.collaborators.indexOf(user) != -1){
        genOptionsExperience("opciones-exp-popup-propio",exp)
    }
    else{
        genOptionsExperience("opciones-exp-popup-otro",exp)
    }

}

function genOptionsExperience(pop_up,exp){
    if (pop_up == "opciones-exp-popup-propio"){
        
        document.getElementById("opciones-exp-propio").innerHTML = 
        ` 
            <div>
                <p class = ${exp.id} onclick = genDetalles(event)>Ver datos detallados</p>
                <p class = ${exp.id} onclick = delExp(event)><a class = ${exp.id} href = "perfil.html">Eliminar publicación</a></p>
            </div>
        `
        showPopUp("#opciones-exp-popup-propio")
    }
    else{
        document.getElementById("opciones-exp-otro").innerHTML = 
        `
            <div>
                <p class = "${exp.id}" onclick = genDetalles(event)>Ver datos detallados</p>
                <p class = "${exp.id}" onclick = denunciar()>Denunciar publicación</p>
            </div>
        `
        showPopUp("#opciones-exp-popup-otro")
    }
}

function genDetalles(event){
    let exp = getFromStorage("experiencias",event.target.classList.item(0))
    if( exp.masDetalles.length == 0){
        document.getElementById("datos-detallados-content").innerHTML = 
        `<h2>Ver datos detallados:</h2>
        <div class="dato-detalle">
            <p>Presupuesto:</p>
            <p>-----</p>
        </div>
        <div class="dato-detalle">
            <p>Transporte:</p>
            <p>-----</p>
        </div>
        <div class="dato-detalle">
            <p>Alojamiento:</p>
            <p>-----</p>
        </div>
        <div class="dato-detalle links-detalles">
            <p>Link de utilidad:</p>
            <p><a href="">-----</a></p>
        </div>`
        showPopUp("#datos-detallados-popup");
    }
    else {
        document.getElementById("datos-detallados-content").innerHTML = 
        `<h2>Ver datos detallados:</h2>
        <div class="dato-detalle">
            <p>Presupuesto:</p>
            <p>${exp.masDetalles[0]}€</p>
        </div>
        <div class="dato-detalle">
            <p>Transporte:</p>
            <p>${exp.masDetalles[1]}</p>
        </div>
        <div class="dato-detalle">
            <p>Alojamiento:</p>
            <p>${exp.masDetalles[2]}</p>
        </div>
        <div class="dato-detalle links-detalles">
            <p>Link de utilidad:</p>
            <p><a href="${exp.masDetalles[3]}">Click aquí</a></p>
        </div>`
        showPopUp("#datos-detallados-popup");
    }
 
}

function delExp(event){
    var experiencia = getFromStorage("experiencias",event.target.classList.item(0))
    var user = getUser("user-logged")
    user.experiencias.splice(user.experiencias.indexOf(experiencia.id))
    addToStorage("users",user)
    removeFromStorage("experiencias",experiencia.id)
    localStorageHolder()
 

}

function userNotMged(experiencia) {
    if (experiencia.user_mged.indexOf(getUser("user-logged").id ) == -1){
        return true
    }
    return false
}

function darMeGusta(event){
    let experiencia = getFromStorage("experiencias",event.target.classList.item(0))
    if (getCookie("user-logged") == ""){
        $("#experiencias-pop-up").removeClass("active")
        showPopUp("#Log-in-pop-up")
        return false;
    }
    if (userNotMged(experiencia)){
        experiencia.mg += 1;
        experiencia.user_mged.push(getUser("user-logged").id)
        addToStorage("experiencias", experiencia)
        document.getElementById("corazon-rojo").style.transform = "scale(1)"
        var new_mg = getFromStorage("experiencias",experiencia.id).mg
        document.getElementById("cantidad-mg").innerHTML = `<h2>${new_mg} Me gusta</h2>`
        if (document.getElementById("total-mg") != null){
            document.getElementById("total-mg").innerHTML = `<b>${mgCounter(getUser(experiencia.collaborators[0]))}</b> me gusta <i class="fas fa-heart"></i>`
        }

    }
    else{
        experiencia.mg -= 1;
        experiencia.user_mged.splice(experiencia.user_mged.indexOf(getUser("user-logged").id))
        addToStorage("experiencias", experiencia)
        document.getElementById("corazon-rojo").style.transform = "scale(0)"
        document.getElementById("cantidad-mg").innerHTML = `<h2>${getFromStorage("experiencias",experiencia.id).mg} Me gusta</h2>`
        if (document.getElementById("total-mg") != null){
            document.getElementById("total-mg").innerHTML = `<b>${mgCounter(getUser(experiencia.collaborators[0]))}</b> me gusta <i class="fas fa-heart"></i>`
        }
    }

}

function mgCounter(user){
    user.meGustas = 0;
    for(var i = 0; i < user.experiencias.length; i++){
      var exp = getFromStorage("experiencias",user.experiencias[i])
      user.meGustas += exp.mg
    }
    addToStorage("users", user);
    return user.meGustas
}

function mostrar_compartir(){
    showPopUp("#Compartir-pop-up")
}

function denunciar(){
    showPopUp("#denunciar-popup")
}
function closeDenunciar(){
    $("#denunciar-popup").removeClass("active")

}