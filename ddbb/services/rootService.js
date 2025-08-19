




export class RootService{

    static creaRootUser({ROOT_USER, ROOT_PASS}, DBModel){

        DBModel.creaUsuario({username:ROOT_USER, password: ROOT_PASS, superUsuario: true})
        .catch(err=>{

            if(err.message === "El usuario con ese nombre ya existe") return;
        
            throw err;
        });

    }


}