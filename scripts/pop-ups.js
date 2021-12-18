
function popUpLogInShow(){
   showPopUp("#Log-in-pop-up")
}

 $(".close-button").click(function(){
    id = $(this).parents(".top-pop-up").parents(".pop-up").attr('id')
    if (id == "crear-experiencia-popup" || id == "crear-experiencia-popup-2" || id == "experiencias-pop-up"){
      $(document).find(".active").removeClass("active")
    }
     $(this).parents(".top-pop-up").parents(".pop-up").removeClass("active")
     let popUps_active = $(document).find(".active")
     if(popUps_active.length == 0){
      $(".overlay").hide()
      }
 })

 $("#iniciar-sesion-a").click(function(){
    $("#Sign-up-pop-up").removeClass("active")
    $("#Log-in-pop-up").addClass("active")
 })

 $("#crear-cuenta-a").click(function(){
    $("#Log-in-pop-up").removeClass("active")
    $("#Sign-up-pop-up").addClass("active")
 })

 $("#cerrar-sesion").click(function(){
    $("#cerrar-sesion-popup").addClass("active")
    $(".overlay").show()
    $(".menuoptions").css("top","-400px")
    $("#header").removeClass("shadow")   
})

$("#No").click(function(){
   $(this).parents(".cerrar-sesion-popup-content").parents(".pop-up").removeClass("active")
   let popUps_active = $(document).find(".active")
   if(popUps_active.length == 0){
    $(".overlay").hide()
   }
})

$("#Si").click(function(){
   $(this).parents(".cerrar-sesion-popup-content").parents(".pop-up").removeClass("active")
   $(".overlay").hide()
   deleteCookie("user-logged")
   document.getElementById("log_in_button").style.display="block";
   document.getElementById("mas-añadir").style.display="none";
   document.getElementById("sesion_container").removeChild(document.getElementById("logged"))
});

/* Crear experiencia */

$("#flip").click(function(){
   $("#datos-avanzados").slideToggle("fast");
});

function showPopUp(id) {
  
   let popUps_active = $(document).find(".active")
   $(id).addClass("active")
   if(popUps_active.length == 0){
      $(".overlay").show()
   }
  
}

function removePopUp(id) {
   $(id).removeClass("active")
   let popUps_active = $(document).find(".active")
   if(popUps_active.length == 0){
      $(".overlay").hide()
   }
}




var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
output.innerHTML = this.value;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
output2.innerHTML = this.value;
}

var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("demo3");
output3.innerHTML = slider3.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider3.oninput = function() {
output3.innerHTML = this.value;
}


