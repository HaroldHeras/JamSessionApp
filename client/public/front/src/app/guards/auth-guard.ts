import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { inject} from '@angular/core';


export const authGuard: CanActivateFn = async(route, state) => {


  const authService = inject(Auth);
  const router = inject(Router);
  let permitido = false;  

  await authService.autenticacion()
  authService.auth$.subscribe({
    next: (data)=> permitido=data
  })

  if(!permitido){

    router.navigate(["/login"]);
    return false;

  }
  return true;

};
