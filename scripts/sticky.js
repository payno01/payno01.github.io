
var header = document.getElementById("header");
window.addEventListener("scroll", function(){
  if(window.scrollY!=0){
    //user is at the top of the page; no need to show the back to top button
    header.classList.add("shadow");
  } else {
    if( $(".menuoptions").css("top") == "-400px"){
      header.classList.remove("shadow")
    }
    
  }
});