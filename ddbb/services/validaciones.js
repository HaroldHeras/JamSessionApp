






export class Validaciones{


    static validaUsuario(username, password){

        if(typeof username!== "string") throw new Error("El nombre de usuario debe ser de tipo alfanumérico");
        if(username.length < 6) throw new Error("El nombre de usuario debe contener mínimo 6 carácteres")

        if(typeof password !== "string") throw new Error("La contraseña debe ser de tipo String")
        if(password.length < 9) throw new Error("La contraseña debe tener al menos 9 carácteres")
        
        



    }

    static validaJam(nombreJam){
        if(nombreJam.length===0) throw new Error("Debe escribir un nombre para la jam")
        if(typeof nombreJam !== "string") throw new Error("El nombre de la jam debe ser de tipo alfanumérico")

    }



}