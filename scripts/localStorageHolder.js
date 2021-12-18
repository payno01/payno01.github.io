/*Funcion que hay que utilizar 
siempre antes de abandonar la pagina
Sirve para no perder el local storage de una pagina a otra*/

function localStorageHolder() {

  for(var i = 0; i < localStorage.length; i++){
      var clave = localStorage.key(i);
      sessionStorage.setItem(clave,localStorage.getItem(clave))
    }
}

