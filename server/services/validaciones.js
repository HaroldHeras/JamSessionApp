





export class Validaciones{

    static validaUsuario(usuario){

        const {username, password} = usuario;

        if(typeof username!== "string") throw new Error("El nombre de usuario debe ser de tipo alfanumérico");
        if(username.trim().length < 6) throw new Error("El nombre de usuario debe contener mínimo 6 carácteres")

        if(typeof password !== "string") throw new Error("La contraseña debe ser de tipo String")
        if(password.trim().length < 9) throw new Error("La contraseña debe tener al menos 9 carácteres")
        
        



    }

    static validaJam(jam){
        if(jam.nombre.trim().length===0) throw new Error("Debe escribir un nombre para la jam")
        if(typeof jam.nombre !== "string") throw new Error("El nombre de la jam debe ser de tipo alfanumérico")
        if(!jam.fecha ) throw new Error("Debe seleccionar una fecha")
        if(new Date(jam.fecha) < new Date()) throw new Error("La Jam no puede ser anterior a la fecha y hora de hoy")
        if(jam.instrumentos.length===0 || jam.instrumentos.find(i=>i.nombre.trim()==="")) throw new Error("Debe haber al menos un instrumento")

    }

    static validaCancion(cancion){

        if(cancion.nombre.trim().length===0 || cancion.artista.trim().length===0) throw new Error("Debe escribir un nombre y un artista")
        if(typeof cancion.nombre !== "string" || typeof cancion.artista !== "string") throw new Error("Ambos campos de la jam deben ser de tipo alfanumérico")

    }





}