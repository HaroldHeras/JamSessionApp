import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { Auth } from '../services/auth/auth';


export const loginGuard: CanActivateFn = async (route, state) => {


      const router = inject(Router);
      const autService = inject(Auth);
      let permitido = false;

      await autService.autenticacion();
      autService.auth$.subscribe({
            next: (data)=> permitido=data
      })

      if(permitido){

         router.navigate(["/"]);

        return false;

      }        
        
      return true;



};
