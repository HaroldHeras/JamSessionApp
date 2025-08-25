import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { Auth } from '../services/auth/auth';


export const loginGuard: CanActivateFn = async (route, state) => {


      const router = inject(Router);
      const autService = inject(Auth);



      const respuesta = await autService.autenticacion();

      if(!!respuesta.username){

         router.navigate(["/"]);

        return false;

      }        
        
      return true;



};
