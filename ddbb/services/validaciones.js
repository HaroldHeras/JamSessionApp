





export class Validaciones{

    static validaUsuario(username, password){

        if(typeof username!== "string") throw new Error("El nombre de usuario debe ser de tipo alfanumérico");
        if(username.length < 6) throw new Error("El nombre de usuario debe contener mínimo 6 carácteres")

        if(typeof password !== "string") throw new Error("La contraseña debe ser de tipo String")
        if(password.length < 9) throw new Error("La contraseña debe tener al menos 9 carácteres")
        
        



    }

    static validaJam(jam){


        if(jam.nombre.length===0) throw new Error("Debe escribir un nombre para la jam")
        if(typeof jam.nombre !== "string") throw new Error("El nombre de la jam debe ser de tipo alfanumérico")
        if(!jam.fecha ) throw new Error("Debe escribir una fecha")
        if(new Date(jam.fecha) < new Date()) throw new Error("La Jam no puede ser anterior a la fecha y hora de hoy")

    }

    static validaCancion(cancion){

        if(cancion.nombre.length===0 || cancion.artista.length===0) throw new Error("Debe escribir un nombre y un artista")
        if(typeof cancion.nombre !== "string" || typeof cancion.artista !== "string") throw new Error("El nombre de la jam debe ser de tipo alfanumérico")

    }





}