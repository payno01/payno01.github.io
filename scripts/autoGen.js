$(document).ready(function(){
    if (localStorage.length == 0){
        const usernames = ["Jorge","Alvaro","javi", "javifeo","david1234","jorgeelcurioso","jack el destripador",
                            "abuelita123", "daddy jankee","bad bunny","david el nomo", "cristiano ronaldo", "illojuan","ibai"]
        
        const photos = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIL3OKhYhwnvqL_3KX86sK1nVJ2DsW_Qflg&usqp=CAU",
                        "https://pm1.narvii.com/6217/6f0d7e98a94bd7bba73aa37a88036a426b7f421a_hq.jpg",
                        "https://i.pinimg.com/564x/42/1f/88/421f880e30cb8ae1368e729036f3ea52.jpg",
                        "https://pbs.twimg.com/media/Ejlt_FEWoAAKCJP.jpg",
                        "https://yt3.ggpht.com/JfW-4kiXhIT_WBlVTRh9xHHDoCRRbb75iLsyW9Ep8jNQKcbJT8E1u2Xwna6bHBPFX9zu6WaU5w=s900-c-k-c0x00ffffff-no-rj",
                        "https://yt3.ggpht.com/ytc/AKedOLTjq90N3KKoDNEEDs-j1bs7dDgzjmqULsi6fHUqFQ=s900-c-k-c0x00ffffff-no-rj",
                        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2015/12/547582-analisis-assassins-creed-syndicate-jack-destripador.jpg?itok=BagMLedM",
                        "https://static.wikia.nocookie.net/warnerbros/images/c/cb/Abuelita.png/revision/latest/scale-to-width-down/206?cb=20120728111219&path-prefix=es",
                        "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2020/07/09/daddy-yankee.jpeg",
                        "https://e00-us-marca.uecdn.es/claro/assets/multimedia/imagenes/2021/06/04/16228101907390.jpg",
                        "https://static1.elcorreo.com/www/multimedia/202005/26/media/david-gnomo.jpg",
                        "https://img.a.transfermarkt.technology/portrait/big/8198-1631656078.jpg?lm=1",
                        "https://i.redd.it/m80tq34v0ca51.jpg",
                        "https://yt3.ggpht.com/HSBcGx3lY7uviJ9VDyvQtfuO0JV7XpnvYh0_hKu_-ZWFjghTH4Cuqjpl71Zh7QXWDvF3ojXBkA=s900-c-k-c0x00ffffff-no-rj"]
        var mails = []
        var password = []
        
        const title = ["Alemania","Jap??n","M??xico", "Kioto", "Bejing","Agra", "Nueva York", "Arizona", "Ontario", "Barcelona", "Paris","Roma"]

        const description = [`Alemania es una de las grandes super potencias europeas y de los primeros que se vienen a la cabeza cuando se piensa en Europa junto a otros como
        Espa??a, Francia, Italia o el Reino Unido. Al igual que estos, Alemania est?? cargado de un alto valor hist??rico y cultural.<br>
        Uno de los destinos que m??s recomendamos es la inmensa ciudad de Berlin, la cual ya solo por si misma es capaz de cubrir una semana entera.<br>
        Es la ciudad en la cual se puede vivir m??s arduamente la reminiscencia de la Segunda Guerra Mundial. Entre sus lugares de mayor inter??s tur??stico se encuentran 
        el muro de Berl??n, la Puerta De Brandeburgo, catedrales y museos.<br>
        Tambi??n resulta interesante la visita a la ciudad de Colonia, o a las miles de zonas naturales que aguardan dentro del pa??s.
        Si lo que buscais es una experiencia al m??s puro estilo europeo no dud??is en visitar la cuna de la historia del continente. `,
        
        `Jap??n es uno de los paises orientales que m??s curiosidad levantan dentro de la cultura occidental. Se trata de un pa??s donde 
        tradicci??n y progreso se dan de la mano, dando lugar junto a su ex??tica cultura a uno de los destinos tur??sticos m??s completos 
        que se pueden encontrar.<br>
        Nuestra visita comienza en la ciudad de Tokio, una de las m??s pobladas del mundo y el m??ximo exponente del progreso nip??n.
        En ella podremos encontrar diversos templos, el cruce de Shibuya, la calle de Akihabara o la Skytree Tower, con vistas a todo el Skyline de la ciudad.
        <br>Como contraste tenemos Kioto, la zona m??s tradicional y famosa por templos como el Fushimi Inari, conocido por sus m??s de 1000 "toris" o puertas.
        <br>Tambi??n es un destino ideal para los amantes de la naturaleza, con imponentes montes conquistados por el verde, bosques y volcanes como el Fuji.
        <br>Es recomendable recorrer el pa??s en tren bala para una mejor experiencia.`,

        `M??xico es uno de los pa??ses m??s reconocidos de toda latinoamerica, famoso por una cultura singular y una
        gastronom??a que har?? las delicias de cualquier paladar... siempre y cuando se sea cap??z de soportar el picante, claro.<br>
        Perderse entre sus coloridas calles, admirar los detalles de sus monumentos m??s caracter??sticos o darse un chapuz??n en sus aguas cristalinas
        son solo algunas de las muchas actividades que aguardan en este pa??s.<br>
        Otra cosa a destacar es su variedad de biomas, que va desde vastos desiertos, reminiscentes de esas escenas que a todos se nos viene a la cabeza cuando
        pensamos en el lejano oeste, hasta llegar a sus zonas tropicales.<br>
        Os animamos tambi??n a sumergiros en la historia de los mayas visitando zonas historicas como el Chich??n Itz??, y, por supuesto, no pod??is iros
        sin visitar Mexico D.C. y probar unos tacos al pastor en alg??n puesto callejero, ??es donde mejor est??n!`,

        `Entra en el templo Fushimi Inari y disfruta de espect??culos en directo.`,
        
        `Disfruta de las maravillosas vistas de la ciudad desde la Gran Muralla.`,

        `Disfruta de una visita en el Taj Mahal con comida incluida.`,

        `Conoce la historia de la Estatua de la Libertad en persona.`,
        
        `Disfruta de una ruta en quad alrededor del Gran Ca??on.`,

        `Realiza una ruta a pie para disfrutar de las vistas de estas cataratas.`,

        `Ve a la Sagrada Familia y conoce toda la historia de esta bas??lica.`,

        `??Te gustar??a tener una cena rom??ntica en lo alto de la torre Eiffel?`,

        `Disfruta de una visita guiada por el coliseo con nuestros mejores gu??as.`]

        const ports = ["images/Alemania-Banner.jpg","images/japan-banner.jpg","images/Mexico-banner.jpg","images/templo.jpg",
        "images/muralla.jpg","images/taj.jpg","images/estatua.jpg","images/ca??on.jpg","images/cataratas.jpg","images/sagrada.jpg",
        "images/torre.jpg","images/coliseo.jpg"]

        const tursimo = ["Turismo rural", "Turismo de negocios", "Turismo hist??rico", "Turismo cultural","Turismo rural", "Turismo de negocios", "Turismo hist??rico", "Turismo cultural","Turismo rural", "Turismo de negocios", "Turismo hist??rico", "Turismo cultural"]
        const ubicacion = ["Europa centro", "Sudeste asiatico", "Am??rica central", "Sudeste asiatico", "Asia central", "Ocean??a", "Am??rica del norte",
                            "Am??rica del norte","Am??rica del norte", "Europa del sur", "Europa central", "Europa del sur"]


        for (let i in usernames){
            mails.push(usernames[i].split(" ").join("")+"@gmail.com")
            password.push(usernames[i].split(" ").join(""))
        }

        for(let i in usernames){
            let user = new User(usernames[i],mails[i],photos[i],password[i])
            addToStorage("users", user)
        }

        for(let i = 0; i < 12; i++){
            let exp = new Experience("user-" + usernames[i].split(" ").join(""),ports[i],tursimo[i],ubicacion[i],title[i],description[i],actualdate())
            let user = getFromStorage("users","user-"+usernames[i].split(" ").join(""))
            user.experiencias.push(exp.id)
            addToStorage("users",user)
            addToStorage("experiencias", exp)
            localStorageHolder()
        }
    }
})

