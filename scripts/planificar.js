$("#menu_planificar").click(function(){
    showPopUp("#Planificar-viaje-pop-up")
})

$("#planificar-boton").click(function(ev){
    ev.preventDefault()
    let inputs = $("#planificar-form").find("input");
    let select = $("#planificar-form").find("select");
    let presupuesto_min = inputs[0].value
    let presupuesto_max = inputs[1].value
    let clave = inputs[2].value
    let interes = select[0].value
    if (presupuesto_min > presupuesto_max){
        return(alert("El presupuesto máximo debe ser mayor que el mínimo"))
    }
    setCookie("planificar",presupuesto_min+","+presupuesto_max+","+interes+","+clave)
    localStorageHolder();
    window.location.href= "busqueda.html"
})
