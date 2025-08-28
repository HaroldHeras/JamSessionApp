import DBLocal from "db-local";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Validaciones } from "../../services/validaciones.js";





const {Schema} = new DBLocal({path: "./ddbb/models/db-local/repositorios"});


const User = Schema("User", {

    superUsuario:{type:Boolean, required:true, default:false},
    _id:{type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}


})



const Jams = Schema("Jams", {
    
    activated:{type:Boolean, required:true, default:false},
    _id:{type: String, required: true},
    nombre:{type:String, required:true},
    canciones: {type: Array, required: false}

})


const Canciones = Schema("Canciones", {
    _id:{type: String, required: true},
    nombre:{type:String, required:true},
    artista:{type:String, required: true}
})



export class LocalRepository{


    async creaUsuario({username, password, superUsuario=false}){

        try{

            Validaciones.validaUsuario(username, password);            

            const user = User.findOne({username});

            if(user) throw new Error("El usuario con ese nombre ya existe")
            
            const passwordEncriptada = await bcrypt.hash(password, 10);

            const id = crypto.randomUUID();

            User.create({
                superUsuario,
                _id: id,
                username,
                password : passwordEncriptada
            }).save();

            return id;

        }catch(error){
            throw error
        }

    }


    async logIn({username, password}){

        Validaciones.validaUsuario(username, password);

        const user = User.findOne({username});
        if(!user) throw new Error("No existe ningun usuario con ese nombre");

        const usuarioValido = await bcrypt.compare(password, user.password);
        if(!usuarioValido) throw new Error("La contraseña no es válida")

        const usuarioValidado = {
            _id: user._id,
            username: user.username,
            superUsuario: user.superUsuario
        }

        return usuarioValidado;

    }


    async creaJam(nombreJam, canciones = []){

        try{

            Validaciones.validaJam(nombreJam);
            const jam = Jams.findOne({nombre: nombreJam})
            if(jam) throw new Error("Ya existe una Jam con ese nombre");

            const id = crypto.randomUUID();

            const jamNueva= {
                _id:id,
                nombre:nombreJam,
                canciones
            }

            Jams.create(jamNueva).save();

            return jamNueva;

        }catch(error){
            throw error;
        }

    }


    async getJamsAll(){

        try{

            const jams = Jams.find();
            return jams;

        }catch(error){
            throw error;
        }

    }

    


}



