import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';


export const registerGuard: CanActivateFn = async (route, state) => {


    const router = inject(Router);


    const respuesta = await fetch("/superUsuario");

    if(respuesta.status===200){

      router.navigate(["/login"]);

      return false;

    } 
        
        
      return true;





  return true;
};
