class User{
    constructor(name,mail,photo,password){

      this.name = name;
      this.id = "user-" + name.split(" ").join("")
      this.mail = mail;
      if (photo != ""){
        this.photo = photo;
      }
      else{
        this.photo = "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
      }
      this.password = password
      this.colecciones = [];
      this.experiencias = [];
      this.meGustas= 0;
    }
  }


  class Experience{
    constructor(owner,port,turismo,ubicacion,title,description, date){
      this.collaborators = [owner];
      this.portada = port;
      this.turismo = turismo
      this.ubicacion = ubicacion
      this.title = title;
      this.id = "exp-" + this.collaborators[0].split("-")[1] +"-"+ this.title.split(" ").join("") 
      this.gallery = [];
      this.description = description;
      this.mg = 0
      this.user_mged = []
      this.date = date;
      this.masDetalles = []



    }
  }
  
  class Collection{
    constructor(owner,title,img,description){
      this.owner = owner
      this.title = title;
      this.id = "col-" + this.owner + "-" + this.title.split(" ").join("");
      this.img = img;
      this.description = description;
      this.experiences = [];
    }
  }


