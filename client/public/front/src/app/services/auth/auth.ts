import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {


    constructor(private http: HttpClient){}


    autenticacion():Observable<boolean>{

        let permitido: any;


        this.http.get<{authorization:boolean}>("/autenticacion").subscribe({

          next: datos => console.log(datos)//permitido = datos.authorization
        })

        return permitido;
       

    }




     



    logIn(clave:string): Observable<any> {

        let respuesta: any;


        this.http.post("/autenticacion", {clave}).subscribe({

          next: datos => respuesta = datos


        })

        return respuesta.message;



    }


  
}
