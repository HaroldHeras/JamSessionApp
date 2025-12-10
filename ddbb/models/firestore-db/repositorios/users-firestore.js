import bcrypt from "bcrypt";



export class Users{

    constructor(firestoreDb){
        this.firestoreDb = firestoreDb;
    }

    async creaUsuario({username, password, superUsuario=false}){

        try{
            const usersRef = this.firestoreDb.collection("users");
            const query = usersRef.where("username", "==", username);
            const snapshot = await query.get();        
            if(!snapshot.empty) throw new Error("El usuario con ese nombre ya existe");
            const passwordEncriptada = await bcrypt.hash(password, 10);
            const usuarioNuevo = {
                superUsuario,
                username,
                password:passwordEncriptada
            }   

            const docRef = await this.firestoreDb.collection('users').add(usuarioNuevo);

            return {id:docRef.id, ...usuarioNuevo}

        }catch(error){
            throw error
        }

    }


    async logIn(usuario){
        try{

            const usersRef = this.firestoreDb.collection("users");
            const query = usersRef.where("username", "==", usuario.username)
            const snapshot = await query.get();        
            if(snapshot.empty) throw new Error("No existe ningun usuario con ese nombre");
            const passwordValidada = await bcrypt.compare(usuario.password, snapshot.docs[0].data().password)
            if(!passwordValidada) throw new Error("La contraseña no es válida")
            
            const usuarioValidado = {
                id: snapshot.docs[0].id,
                username: snapshot.docs[0].data().username,
                superUsuario: snapshot.docs[0].data().superUsuario
            }

            return usuarioValidado;


        }catch(error){
            throw error;
        }
    }


}
