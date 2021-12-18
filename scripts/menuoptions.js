
function menuOptions(){
    if( $(".menuoptions").css("top") == "-400px"){
        $(".menuoptions").css("top","63px")
        $("#header").addClass("shadow")
    }
    else{
        $(".menuoptions").css("top","-400px")
        $("#header").removeClass("shadow")   
    }
    var children = $(".menuoptions").find("button")
    $(children[1]).click(function(){
        showPopUp("#crear-experiencia-popup")
    });
        
    $(children[2]).click(function(){
        showPopUp("#Colecciones-pop-up")
    });
        
    $(children[3]).click(function(){
        showPopUp("#Planificar-viaje-pop-up")
    });

} 




