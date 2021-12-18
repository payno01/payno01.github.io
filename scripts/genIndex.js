$(document).ready(function() {

    if (localStorage.experiencias != null) {
        var exps = $.parseJSON(localStorage.experiencias);
        var arraymgexp = []
        for(let key in exps){
            var exp = $.parseJSON(exps[key])
            arraymgexp.push([exp.mg, exp.id])
        }
        arraymgexp.sort((a,b)=>b[0]-a[0])
        for(let i = 0; i < arraymgexp.length; i++){
            exp = getFromStorage("experiencias",arraymgexp[i][1])
            document.getElementById("corousel-topexp").innerHTML +=
            `<div class="carousel-item">
                <a href  = "#" onclick = "genExp_pop(event)"><div ><img class = "${exp.id}" src="${exp.portada}" alt="${exp.id}"></div></a><p>${exp.title}</p>
            </div>`
        }

        
        var arraymg = []
        var usuarios = $.parseJSON(localStorage.users);
        for(let key in usuarios){
            var usuario = $.parseJSON(usuarios[key])
            mgCounter(usuario)
            arraymg.push([usuario.meGustas, usuario.id])
        }
        arraymg.sort((a,b)=>b[0]-a[0])
        for(let i = 0; i < arraymg.length; i++){
            usuario = getFromStorage("users",arraymg[i][1])
            document.getElementById("carousel-usuarios").innerHTML +=
            `<div class="carousel-item">
                <div class="perfiles"  onmouseover = "hover_perfiles(this)" onmouseout="hover_perfiles_out(this)">
                    <a href  = "perfil.html"  onclick = "localStorageHolder(); genCookie(event)">
                        <img class = "${usuario.id}" src="${usuario.photo}" alt="${usuario.id}">
                        <div>${usuario.meGustas}<i class="fas fa-heart"></i></div>
                    </a>
                </div>
                <div class="perfil-name">${usuario.name}</div>
            </div>`

        }
        
    
        

        if (localStorage.experiencias != null) {
            var exps = JSON.parse(localStorage.experiencias);

            let length = 0;
            for(let key in exps){
                length ++
            }
            let contador = 0;
            for(let key in exps){
                if (contador > length - 17 || length < 16){
                    var exp = $.parseJSON(exps[key])
                    document.getElementById("ultimas-container").innerHTML =
                    `
                    <div class="ultima-exp">
                        <div class= "img-container"><img src = "${exp.portada}" alt="${exp.id}"></div>
                        <div class ="description-container">
                            <div>
                                <h3>Autor: ${exp.collaborators[0].split("-")[1]}</h3><h3>${exp.date}</h3> 
                            </div>
                            <h2>${exp.title}</h2>
                            <p>
                            ${exp.description}
                            </p>
                            <button onclick = "genExp_pop(event)" class = "${exp.id} stylebutton visitar-exp">VISITAR EXPERIENCIA</button>
                        </div>
                    </div>
                    `
                    + document.getElementById("ultimas-container").innerHTML
                }
                else{
                    contador++;
                }      
            }
        }
    }
});


function ordenarUsuariosMG(){
    arraymg = []
    usuarios = $.parseJSON(localStorage.users);
    for(let key in usuarios){
        var usuario = $.parseJSON(usuarios[key])
        mgCounter(usuario)
        arraymg.push(usuario.meGustas)
    }

        
    var arr = [ 40, 1, 5, 200 ];
    arr.sort((a,b)=>a-b)

}

