import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { inject} from '@angular/core';


export const authGuard: CanActivateFn = async(route, state) => {


  const authService = inject(Auth);
  const router = inject(Router);


  

  const permitido = await authService.autenticacion()


  if(!permitido){

    return router.navigate(['/LogIn']);

  }

  return permitido;


};
