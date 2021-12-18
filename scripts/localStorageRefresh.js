$(document).ready(function () {
    for(var i = 0; i < sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        localStorage.setItem(clave,sessionStorage.getItem(clave))
      }

    for(var i = 0; i < sessionStorage.length; i++){
      var clave = sessionStorage.key(i);
      sessionStorage.removeItem(clave)
    }
})
