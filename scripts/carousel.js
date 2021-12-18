const page_num = Math.ceil(document.querySelectorAll("#top-experiences .carousel-item").length/4)
$(document).ready(function(){
    $(".contenedor-carousel").scrollLeft(0)
})

/*######################## Flechas #######################*/

function rightCarousel(ev){
    carousel = $(ev.target).parents(".contenedor-principal").children(".contenedor-carousel");
    let position = carousel.scrollLeft();
    carousel.scrollLeft(position + carousel.width());

}

function leftCarousel(ev){
    carousel = $(ev.target).parents(".contenedor-principal").children(".contenedor-carousel");
    let position = carousel.scrollLeft();
    carousel.scrollLeft(position - carousel.width());
} 



/*----------------- Hover perfiles -----------------------------*/

function hover_perfiles(perfil){
    $(perfil).children().children("div").css("opacity", "1");
}
function hover_perfiles_out(perfil){
    $(perfil).children().children("div").css("opacity", "0");
}


