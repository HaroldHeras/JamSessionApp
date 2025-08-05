import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';


export const loginGuard: CanActivateFn = async (route, state) => {


      const router = inject(Router);


      const respuesta = await fetch("/superUsuario");

      if(respuesta.status===204){

        router.navigate(["/register"]);

        return false;

      } 
        
        
      return true;



};
