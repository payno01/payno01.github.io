{

 const letters_password = /^[0-9a-zA-Z]+$/;
 const email_validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const errors_array = ["#user-not-found", "#wrong-password-log-in", "#wrong-password-sign-up", "#not-same-password", "#user-already-owned", "#empty_inputs", "#wrong-email","#email-already-in-use", "#user-already-owned-2", "#empty_inputs-2","#exp-already-exists"];


  function error(input_box,error_type,form){
    removeErrors();
    removeBorder(form);
    $(input_box).css("border", "1px solid red");
    $(error_type).show()
    }

  function removeBorder(form){
    for(let i = 0; i < form.length; i++){
        $(form[i]).css("border", "1px solid #aaa");
        }
  }

  function removeInputs(){
  for(let i = 0; i < inputs_array.length; i++){
      $(inputs_array[i]).val("");
  }
    $("#fecha-nac").prop("value", null)
    $("#condiciones").prop("checked", false);
  }

  function removeErrors(){
    for(let i = 0; i < errors_array.length; i++){
        $(errors_array[i]).hide();
    }	
  }


  function getUser(cookiename) {
    return getFromStorage("users",getCookie(cookiename).split(",")[1])
  }


  $(document).ready(function(){
      if (getCookie("user-logged") != "" ){
          iniciar_sesion(getUser("user-logged"));
      }
    })


  //Inicio de sesión
  $("#Log-in-pop-up-button").click(function(){
      let children = $(this).prev().find("input");
      let username = children[0].value;
      let password = children[1].value;
      if (getFromStorage("users","user-"+ username.split(" ").join("")) != null){
        let user = getFromStorage("users","user-"+username.split(" ").join(""))
        if (password == user.password){
          setCookie("user-logged",user.id)
          removeBorder(children)
          removeErrors()
          removePopUp("#Log-in-pop-up")
          iniciar_sesion(user);

        }
        else{
          error(children[1], "#wrong-password-log-in", children)
        }
      } else {
          error(children[0], "#user-not-found", children)
        }
    })

  function checkEmail(email) {
   
    if(localStorage.getItem("users") != null){
      let val = JSON.parse(localStorage.getItem("users"));
      for(let key in val){
        var user = $.parseJSON(val[key])
        if (user.mail == email){
          return false
        }
      }
      return true;
    }
  return true;
  }

    /*
 
    for(var i = 0; i < localStorage.length; i++){
      var clave = localStorage.key(i);
      var user = $.parseJSON(localStorage.getItem(clave))
      if (user.mail == email){
        return false
      }
    }
    return true;
    */
  


    //Registro
    $("#Crear-cuenta-pop-up-button").click(function(){
      let children = $(this).prev().find("input");
      let username = children[0].value;
      let mail     = children[1].value;
      let password = children[2].value;
      let confirm_password = children[3].value
      let profile  = children[4].value;
  
      
      if (username != "" && password != "" && confirm_password != "" && mail != ""){
        if (getFromStorage("users", "user-" + username.split(" ").join("")) == null && password == confirm_password && password.match(letters_password) &&  mail.match(email_validation) && checkEmail(mail) && checkIfImageExists(profile)){
          var new_user = new User(username,mail,profile,password)
          addToStorage("users",new_user)
          removeBorder(children)
          removeErrors()
          $("#Sign-up-pop-up").removeClass("active")
          $("#Log-in-pop-up").addClass("active") 
        }
        
      else if(getFromStorage("users","user-" + username.split(" ").join("")) != null){
          error(children[0],"#user-already-owned",children)
      }
      
      else if (password != confirm_password){
          error(children[2],"#not-same-password",children);
          $(children[3]).css("border", "1px solid red");
      }

      else if (checkEmail(mail) == false){

          error(children[1], "#email-already-in-use",children); 
      }

      else if (mail.match(email_validation) == null){
        error(children[1],"#wrong-email",children);  
      }

      else if (password.match(letters_password) == null ){
          error(children[2],"#wrong-password-sign-up",children);
      }
      

      }
      else{
        removeErrors()
        removeBorder(children)
        $("#empty_inputs").show()
        if (username == ""){
          $(children[0]).css("border", "1px solid red");
        }
        if (password == ""){
          $(children[2]).css("border", "1px solid red");
        }
        if (confirm_password == ""){
          $(children[3]).css("border", "1px solid red");
        }
        if (mail == ""){
          $(children[1]).css("border", "1px solid red");
        }
      }
    })

  function getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (cname != ""){
          if (c.includes("="+cname) == true) {
              return c.replace("=", ",");
          }
          else if(c.indexOf(name) == 0) {
              return c.replace("=", ",");
          }
        }
      }
      return "";
    }

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";Secure";
    }

    function deleteCookie(nombre){
      setCookie(nombre,"",0);
    }

    function iniciar_sesion(user){
      document.getElementById("log_in_button").style.display = "none";
      document.getElementById("mas-añadir").style.display = "block";
      document.getElementById("sesion_container").innerHTML += `<div class="logged-container" id="logged"><button onclick = "menuOptions(); genCookie(event)"  class = "${user.id} perfil-logo logo-header"><img src = ${user.photo} alt="${user.id}-foto"></button></div>`
  }

}




