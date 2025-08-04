import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { RegisterService } from '../services/register/register-service';


export const loginGuard: CanActivateFn = async (route, state) => {


      const router = inject(Router);


      const existeSuperUsuario = await fetch("/user-repository");


      const resultado = await existeSuperUsuario.json();

      if(resultado.length!==0){

        return true;
      }else{

        router.navigate(["/register"]);

        return false;
      }


      
      


      





  return true;
};
