$(document).ready(function() {
    if (getCookie("planificar") != ""){
        var array_planificar = getCookie("planificar").split(",")
        var presupuesto_min = array_planificar[1];
        var presupuesto_max = array_planificar[2];
        var interes = array_planificar[3].toUpperCase();
        var clave = array_planificar[4].toUpperCase();
        var buscar = "Planificar"
        deleteCookie("planificar")
    }
    else{
        if (getCookie("busqueda") != ""){
            var buscar = getCookie("busqueda").split(",")[1].toUpperCase();
        }
    }

    document.getElementById("busqueda-container").innerHTML = 
    `<div class="path-container">
        <i class="fas fa-home casa-path"></i>
        <p><a href = "index.html">Inicio</a>/<a href = "busqueda.html">Resultados de la búsqueda</a>/<a href = "busqueda.html">${buscar}</a></p>
    </div>
    <h1>RESULTADOS DE LA BÚSQUEDA</h1>`

    if (localStorage.experiencias != null) {
        experiencias = $.parseJSON(localStorage.experiencias);
    }
    else{
        experiencias = {}
    }
    let counter = 0;
    for(let key in experiencias){
        var exp = $.parseJSON(experiencias[key])
        var turismo = exp.turismo.toUpperCase();
        var ubicacion = exp.ubicacion.toUpperCase();
        var title = exp.title.toUpperCase();
        var description = exp.description.toUpperCase();
        var autor = exp.collaborators[0].split("-")[1].toUpperCase();
        var presupuesto = exp.masDetalles[0]
        var inner = `
        <div class="ultima-exp">
            <div class= "img-container"><img src = ${exp.portada}></div>
            <div class ="description-container">
                <div>
                    <h3>Autor: ${exp.collaborators[0].split("-")[1]}</h3><h3>${exp.date}</h3> 
                </div>
                <h2>${exp.title}</h2>
                <p>${exp.description}</p>
                    <button onclick = "genExp_pop(event)" class = "${exp.id} stylebutton visitar-exp">VISITAR EXPERIENCIA</button>
            </div>
        </div>
        `
        if (buscar != "Planificar"){
            if (turismo.indexOf(buscar) != -1 || ubicacion.indexOf(buscar) != -1 || title.indexOf(buscar) != -1 || description.indexOf(buscar) != -1 || autor.indexOf(buscar) != -1){
                document.getElementById("busqueda-container").innerHTML += inner
                counter += 1;
            }
        }
        else{
            if (turismo.indexOf(clave) != -1  || ubicacion.indexOf(clave) != -1 || title.indexOf(clave) != -1 || description.indexOf(clave) != -1 || autor.indexOf(clave) != -1) {
                if (turismo.indexOf(interes) != -1){
                    if(presupuesto>=presupuesto_min && presupuesto<=presupuesto_max){
                        document.getElementById("busqueda-container").innerHTML += inner
                        counter += 1;
                    }
                }
            }
        }

    }
    if (counter == 0){
        document.getElementById("busqueda-container").innerHTML += 
            
            `<h2 class="h2noexp"> No se ha encontrado ninguna experiencia </h2>
            <img class="user-img-sin-exp" src = "https://st2.depositphotos.com/1967477/6346/v/600/depositphotos_63462971-stock-illustration-sad-smiley-emoticon-cartoon.jpg">
            `
    }
})