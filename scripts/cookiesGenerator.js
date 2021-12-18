function genCookie(el) {
    let user_name = el.target.classList.item(0);
    setCookie("perfil-generator",user_name);
}

function cookiebusq(){
    let busqueda = $("#searchterm").val();
    if (busqueda == ""){
        alert("Debes de introducir una búsqueda")
    }
    else{
        setCookie("busqueda", busqueda)
        document.getElementById("href-busqueda").href = "busqueda.html"
    }
};

function cookieContinent(event){
    setCookie("busqueda",$(event.target).html())
    window.location.href= "busqueda.html"
};