import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {




    constructor(private http: HttpClient){}


    async autenticacion():Promise<boolean>{



      const permitido = await firstValueFrom(this.http.get<{authorization:boolean}>("/autenticacion"))

        
      return permitido.authorization;
       
        
         

        
       

    }




     



    async logIn(clave:string): Promise<any> {

        let respuesta: any;

        try{

          respuesta = await firstValueFrom(this.http.post("/autenticacion", {password:clave}));

         

          return respuesta;



        }catch(error){

          return error;        
        
        } 

    }

  
}
