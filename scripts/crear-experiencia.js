$(".crear-experiencia-datos-campos").submit(function(ev){
    ev.preventDefault();
    if ($(".crear-experiencia-imagen").find("img")[0] === undefined){
        return alert("Debes introducir una imagen en la cabecera")
    }
    $("#crear-experiencia-popup").removeClass("active");
    $("#crear-experiencia-popup-2").addClass("active");
})

/* Funciones para insertar enlaces */
function addLink(a){
    $("#insertar-enlace-popup").addClass("active");
    $("#insertar-enlace-popup").data("function", a);
}

$("#enlace-form").submit(function(ev){
    ev.preventDefault();
    let func = $("#insertar-enlace-popup").data("function");
    let value = $("#enlace-form").find("input")[0].value;
    if (checkIfImageExists(value)){
        $("#insertar-enlace-popup").removeClass("active");
        func(value);
    }
})

$("#multimedia-add").click(function(){
    let f = link => {
        let html = `                        
        <div class="multimedia-frame">
        <div class="editar-imagen-container">
        <button onclick="editGallery(this)"><i class="fas fa-edit"></i></button>
        <button onclick="remove_experience(this)"><i class="fas fa-trash-alt"></i></button></div><div class="container-img"><img src=IMAGEN alt="" class="background-container"><div class = "img-in-container"><img src=IMAGEN></div></div></div>`
        for (i=0; i<2; i++){
            html = html.replace("IMAGEN", link);
        }
        $("#crear-experiencia-multimedia-table").prepend(html);
    }
    addLink(f);
})

function editGallery(frame){
    let f = link => {
        let parent = $(frame).parents(".multimedia-frame")[0]
        let img = $(parent).find("img");
        for(var i = 0; i<img.length; i++){
            console.log($(img[i]))
            img[i].src = link;
        }
    }
    addLink(f);
}

function remove_experience(object){
    let parent = $(object).parents(".multimedia-frame")[0];
    parent.remove();
}

$("#crear-continente").change(function(){
    let change = $("#crear-region");
    switch (this.value){
        case "África":
            change.html("<option disabled selected>Seleccione la región</option><option>África del Norte</option><option>África del Sur</option><option>África del Este</option><option>África del Oeste</option><option>África Central</option>");
            break;
        case "América":
            change.html("<option disabled selected>Seleccione la región</option><option>América del Norte</option><option>América del Sur</option><option>América Central</option>");
            break;
        case "Asia":
            change.html("<option disabled selected>Seleccione la región</option><option>Asia del Norte</option><option>Asia del Sur</option><option>Asia Central</option><option>Sudeste Asiatico</option><option>Asia Occidental</option>");
            break;
        case "Europa":
            change.html("<option disabled selected>Seleccione la región</option><option>Europa del Norte</option><option>Europa del Sur</option><option>Europa del Este</option><option>Europa del Oeste</option><option>Europa Central</option>");
            break;
        case "Oceanía":
            change.html("<option disabled selected>Seleccione la región</option><option>Australia</option><option>Melanesia</option><option>Micronesia</option><option>Polinesia</option>");
            break;
    }
})

function cambiarCabecera(){
    let f = link => {
        let html = `<div class="editar-imagen-container">
        <button class="stylebutton cambiar-cabecera" id="editar-cabecera-button" onclick="cambiarCabecera()">Editar imagen</button>
        </div><div class="container-img"><img src=IMAGEN alt="" class="background-container"><div class = "img-in-container"><img src=IMAGEN></div></div>`
        for (i=0; i<2; i++){
            html = html.replace("IMAGEN", link);
        }
        $(".crear-experiencia-imagen").css("padding", "0% 0%")
        $(".crear-experiencia-imagen").html(html);    
    }
    addLink(f);
}

$("#crear-experiencia-multimedia-next").click(function(){
    $("#confirmar-publicacion-popup").addClass("active");
    $("#crear-experiencia-popup-2").removeClass("active");
})

$(".deshacer").click(function(){
    $("#confirmar-publicacion-popup").removeClass("active");
    $("#crear-experiencia-popup").addClass("active");
})

/* Crear objeto de la experiencia */
$(".hecho").click(function(){
    $("#confirmar-publicacion-popup").removeClass("active");
    let username = getCookie("user-logged").split(",")[1]
    var cover = ""
    if ($(".crear-experiencia-imagen").find("img").length != 0){
        console.log($(".crear-experiencia-imagen").find("img")[0])
        cover = $(".crear-experiencia-imagen").find("img")[0].src;
    }
    let inputs = $(".crear-experiencia-datos-campos").find("input");
    let selects = $(".crear-experiencia-datos-campos").find("select");
    let turism = selects[0].value;
    let location = selects[1].value + " - " + selects[2].value;
    let title = inputs[0].value;
    let description = $(".crear-experiencia-datos-campos").find("textarea")[0].value;
    let gallery = $("#crear-experiencia-multimedia-table").children(".multimedia-frame");
    var galleryData = [];
    let datos = $("#datos-avanzados").find("input")
    var datos_avanzados_array = [datos[0].value,datos[1].value,datos[2].value,datos[3].value]
    for (var i = 0; i <= gallery.length; i++){
        if ($(gallery[i]).find("img").length != 0){
            let img = $(gallery[i]).find("img")[0].src;
            galleryData.push(img);
        }
    } 
    let date = actualdate();
    let exp = new Experience(username, cover, turism, location, title, description, date);
    exp.masDetalles.push(...datos_avanzados_array)
    
    if (getUser(username).experiencias.indexOf("exp-"+username.split("-")[1]+"-"+title.split(" ").join("")) != -1){
        contador = 1;
        id = "exp-"+username.split("-")[1]+"-"+title.split(" ").join("")
        while (getUser(username).experiencias.indexOf(id+contador) != -1){
            contador ++ 
        }
        exp.id = id + contador
    }
    
    exp.gallery = galleryData;
    if (inputs[1].value != ""){
        var collaborators = "user-" + inputs[1].value ;
        exp.collaborators.push(...collaborators.split(","));
    }

    addToStorage("experiencias", exp);
    let user = getUser("user-logged");
    user.experiencias.push(exp.id);
    addToStorage("users", user);
    localStorageHolder()
    $(".overlay").hide()
})

$("#volver-crear-experiencia").click(function(){
    $("#crear-experiencia-popup-2").removeClass("active");
    $("#crear-experiencia-popup").addClass("active");
})

$("#mas-añadir").click(function(){
    if (!$("#crear-experiencia-popup").hasClass("active") && !$("#crear-experiencia-popup-2").hasClass("active")){
        $(".overlay").show()
        $("#crear-experiencia-popup").addClass("active");
    }
})

/* Gestión de datos en el localStorage */
function addToStorage(dict, item){
    if(localStorage.getItem(dict) == null){
        localStorage.setItem(dict, JSON.stringify({}));
    }
    let val = JSON.parse(localStorage.getItem(dict));
    val[item.id] = JSON.stringify(item);
    localStorage.setItem(dict, JSON.stringify(val));
    return 
}

function getFromStorage(dict, name){
    if(localStorage.getItem(dict) != null){
        let val = JSON.parse(localStorage.getItem(dict));
        if (val[name] != null){
            return JSON.parse(val[name]);
        }
    }
    return null;
}

function removeFromStorage(dict,name){
    let val = JSON.parse(localStorage.getItem(dict));
    val.hasOwnProperty(name)
    delete val[name]
    localStorage.setItem(dict,JSON.stringify(val))
}


function actualdate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}