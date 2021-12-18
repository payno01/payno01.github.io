function abrirColecciones(username){
    $(".contenido-colecciones").html("");
    let user = null;
    if (username == null){
        user = getUser("user-logged");
    }else{
        user = getFromStorage("users", username);
    }
    for (index in user.colecciones){
        let col = getFromStorage("colecciones", user.colecciones[index]);
        console.log(col)
        let html = `<div class = "CLASE coleccion" onclick="abrirColeccion(this)">
        <div onclick = delColl(event) class="${col.id} delete-coll"><i class="fas fa-minus-circle"></i></div>
        <div class="container-img" >
            <div class = "img-in-container"><img alt="img1" src=COVER></div>
        </div>
        <div class = "coleccion-text">
            <h1>TITLE</h1> 
            <p> DESCRIPTION</p>
        </div>
    </div>`
        html = html.replace("CLASE", col.id);
        html = html.replace("COVER", col.img);
        html = html.replace("TITLE", col.title);
        html = html.replace("DESCRIPTION", col.description);
        $(".contenido-colecciones").append(html);
    }
}

function abrirColeccion(object){
    $("#coleccion-inside-container").html("")
    let col_name = object.classList.item(0);
    let col = getFromStorage("colecciones", col_name);
    let html_izquierda = `<div class = "coleccion-inside-izq">
        <div class="ultima-exp">
            <div class="container-img">
                <div class = "img-in-container"><img  alt="img12"src=COVER></div>
            </div>
            <div class ="description-container">
                <h2>TITLE</h2>
                <p>DESCRIPTION</p>
            </div>
        </div>
    </div>`
    html_izquierda = html_izquierda.replace("COVER", col.img);
    html_izquierda = html_izquierda.replace("TITLE", col.title);
    html_izquierda = html_izquierda.replace("DESCRIPTION", col.description);
    $("#coleccion-inside-container").append(html_izquierda);
    $(".coleccion-inside-popup").addClass("active");
    html_final = `<div class = "coleccion-inside-derecha">`
    for (index in col.experiences){
        let exp_name = col.experiences[index];
        let exp = getFromStorage("experiencias", exp_name);
        let html_derecha = `<div class="ultima-exp" >
            <div class="container-img">
                <img  src=COVER alt="img13" class="background-container">
                <div class = "img-in-container"><img onclick="genExp_pop(event)" class = "CLASE" alt="img14" src=COVER></div>
            </div>
            <div class ="description-container">
                <div>
                    <h3>Autor: AUTOR</h3><h3>FECHA</h3> 
                </div>
                <h2>TITULO</h2>
                <p>DESCRIPCION</p>
            </div>
        </div>`
        for (i=0; i<2; i++){
            html_derecha = html_derecha.replace("COVER", exp.portada);
        }
        html_derecha = html_derecha.replace("CLASE", exp.id);
        html_derecha = html_derecha.replace("AUTOR", exp.collaborators[0].split("-")[1]);
        html_derecha = html_derecha.replace("FECHA", exp.date);
        html_derecha = html_derecha.replace("TITULO", exp.title);
        html_derecha = html_derecha.replace("DESCRIPCION", exp.description);
        html_final += html_derecha;
    }
    html_final += `</div>`;
    $("#coleccion-inside-container").append(html_final);
}

function delColl(event){
    var col = getFromStorage("colecciones",event.target.classList.item(0))
    var user = getUser("user-logged")
    user.colecciones.splice(user.colecciones.indexOf(col.id))
    addToStorage("users",user)
    removeFromStorage("colecciones",col.id)
    localStorageHolder()
    window.location.href = "perfil.html"
 }