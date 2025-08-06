import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {




    constructor(private http: HttpClient){}


    async autenticacion():Promise<any>{


      try{

        const permitido = await firstValueFrom(this.http.get<{username:string}>("/autenticacionCookieControlador", {withCredentials: true}));


        return permitido;


      }catch(error){



        return error;

      }       
        
         

        
       

    }




     



    async logIn(usuario: string, clave:string): Promise<any> {


        try{

          const respuesta = await firstValueFrom(this.http.post("/login", {username: usuario, password:clave}));   
          
          return respuesta;  


        }catch(error:any){


          return error;        
        
        } 

    }

  
}
