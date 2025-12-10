import DBLocal from "db-local";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Validaciones } from "../../../server/services/validaciones.js";





const {Schema} = new DBLocal({path: "./ddbb/models/db-local/repositorios"});


const User = Schema("User", {

    superUsuario:{type:Boolean, required:true, default:false},
    _id:{type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}


})



const Jams = Schema("Jams", {
    visible: {type:Boolean, required: true, default: false},
    activated:{type:Boolean, required:true, default:false},
    _id:{type: String, required: true},
    nombre:{type:String, required:true},
    fecha:{type:String, required: true},
    instrumentos:{type:Array, required: true},
    ubicacion:{type:Object, required:true},
    canciones: {type: Array, required: true, default:[]}

})


const Canciones = Schema("Canciones", {
    _id:{type: String, required: true},
    nombre:{type:String, required:true},
    artista:{type:String, required: true},
})


const Propuestas = Schema("Propuestas", {
    _id:{type: String, required: true},
    jamId:{type: String, required: true},
    tipo: {type: String, required: true},
    titulo: {type: String, required: true},
    artista: {type: String, required: false, default: ""},
    participantes: {type: Array, required: false, default: []},
    propuestoPor: {type: String, required: true},
    dedicatoria: {type: String, required: false, default: ""},
    estado: {type: String, required: true},

})



export class LocalRepository{

    async creaUsuario({username, password, superUsuario=false}){

        try{
            const user = await User.findOne({username});
            if(user) throw new Error("El usuario con ese nombre ya existe")
            
            const passwordEncriptada = await bcrypt.hash(password, 10);

            const id = crypto.randomUUID();

            await User.create({
                superUsuario,
                _id:id,
                username,
                password:passwordEncriptada
            }).save();

            return id;

        }catch(error){
            throw error
        }

    }


    async logIn({username, password}){


        const user = await User.findOne({username});
        if(!user) throw new Error("No existe ningun usuario con ese nombre");

        const usuarioValido = await bcrypt.compare(password, user.password);
        if(!usuarioValido) throw new Error("La contraseña no es válida")

        const usuarioValidado = {
            id: user._id,
            username: user.username,
            superUsuario: user.superUsuario
        }

        return usuarioValidado;

    }


    async creaJam(jam){

        try{

            const jamCoincide = await Jams.findOne({nombre: jam.nombre})
            if(jamCoincide) throw new Error("Ya existe una Jam con ese nombre");

            const id = crypto.randomUUID();
            await Jams.create({_id:id, ...jam}).save();
            return {id, ...jam};

        }catch(error){
            throw error;
        }

    }


    async getJamsAll(){

        try{
            const jams = await Jams.find();
            const jamsActualizadas = jams.map(jamOriginal => {
                const j = {...jamOriginal}
                const id = j._id;
                delete j._id;
                j.id = id;
                return j;
            });
            return jamsActualizadas;

        }catch(error){
            throw error;
        }

    }

    async getJam(id){

        try{
            const jamEncontrada = await Jams.findOne({_id:id});
            const jamParseada = {...jamEncontrada}
            delete jamParseada._id;
            return {id, ...jamParseada}
        }catch(error){
            throw error;
        }

    }

    async updateJam(id, jamBody){
        try{
            if(Object.hasOwn(jamBody, 'nombre') || Object.hasOwn(jamBody, 'fecha') || Object.hasOwn(jamBody, 'ubicacion')){
                Validaciones.validaJam(jamBody);
                const jamCoincide = await Jams.findOne({nombre: jamBody.nombre})
                if(jamCoincide && jamCoincide._id!==id) throw new Error("Ya existe una Jam con ese nombre");
            }
            const jamActualizada = await Jams.update({_id:id}, jamBody).save();
            const jamParseada = {...jamActualizada};
            delete jamParseada._id;
            return {id, ...jamParseada};
        }catch(error){
            throw error;
        }
    }

    async borraJam(id){

        try{
            await Jams.remove({_id: id});
        }catch(error){
            throw error;
        }

    }


    async getCancionesAll(){

        try{
            const canciones = await Canciones.find()
            const cancionesParseadas = canciones.map(c=>{
                const cParse = {...c};
                const id = c._id;
                delete cParse._id;
                cParse.id = id;
                return cParse;
            })
            return cancionesParseadas;
        }catch{
            throw error;
        }

    }

    async borraCancion(id){

        try{
            await Canciones.remove({_id: id});
        }catch(error){
            throw error;
        }

    }


     async creaCancion(cancion){

        try{
            const cancionCoincide = await Canciones.findOne({nombre: cancion.nombre})
            if(cancionCoincide) throw new Error("Ya existe una cancion con ese nombre");
            const id = crypto.randomUUID();
            const cancionCreada = await Canciones.create({
                _id: id,
                nombre: cancion.nombre,
                artista: cancion.artista
            }).save();
            const cancionParseada = {...cancionCreada};
            delete cancionParseada._id;
            cancionParseada.id = id;

            return cancionParseada;

        }catch(error){
            throw error;
        }

    }

    async updateCancion(id, cancionBody){
        try{
            const cancionCoincide = await Canciones.findOne({nombre: cancionBody.nombre, artista: cancionBody.artista})
            if(cancionCoincide) throw new Error("Ya existe una cancion con ese nombre");
            const cancionActualizada = await Canciones.update({_id:id}, cancionBody).save();
            const cancionParseada = {...cancionActualizada};
            delete cancionParseada._id;
            cancionParseada.id = id;

            return cancionParseada;
        }catch(error){
            throw error;
        }
    }

    


}



