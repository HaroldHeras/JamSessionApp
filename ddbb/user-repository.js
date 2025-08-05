import DBLocal from "db-local";
import bcrypt from "bcrypt";
import { Validaciones } from "./validaciones.js";
import crypto from "crypto";




const {Schema} = new DBLocal({path: "./ddbb"});


const User = Schema("User", {

    superUsuario:{type:Boolean, required:true, default:false},
    _id:{type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}


})



export class UserRepository{

    static async creaUsuario({username, password, superUsuario=false}){

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




    static async logIn({username, password}){


        Validaciones.validaUsuario(username,password);

        const user = User.findOne({username});
        if(!user) throw new Error("No existe ningun usuario con ese nombre");

        const usuarioValido = await bcrypt.compare(password, user.password);
        if(!usuarioValido) throw new Error("La contraseña no es válida")

        const usuarioValidado = {
            username: user.username
        }


        return usuarioValidado;



    }



    static getSuperUsuario(){


        const user = User.findOne({superUsuario: true});        
        

        return user;



    }








}



