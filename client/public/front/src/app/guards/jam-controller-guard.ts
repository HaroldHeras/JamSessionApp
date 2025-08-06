import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../services/auth/auth';

export const jamControllerGuard: CanActivateFn = async (route, state) => {


  const router = inject(Router);
  const http = inject(HttpClient);
  const authService = inject(Auth);


  const respuesta = await authService.autenticacion();

  if(respuesta.username){
    return true
  }else{
    router.navigate(["/login"])
    return false;
  }




  return true;
};
