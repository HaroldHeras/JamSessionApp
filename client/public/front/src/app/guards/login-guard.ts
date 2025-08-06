import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { Auth } from '../services/auth/auth';


export const loginGuard: CanActivateFn = async (route, state) => {


      const router = inject(Router);
      const autService = inject(Auth);


      const respuestaSuperUsuario = await fetch("/superUsuario");

      const respuestaAuthService = await autService.autenticacion();

      if(respuestaSuperUsuario.status===204){

        router.navigate(["/register"]);

        return false;

      }else if(respuestaAuthService.username){

         router.navigate(["/"]);

        return false;

      }
        
        
      return true;



};
