import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {


    private authSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    auth$:Observable<boolean> = this.authSubject.asObservable();

    constructor(private http: HttpClient){}


    async autenticacion():Promise<any>{
      try{
        const permitido = await firstValueFrom(this.http.get<{id: string, username:string, superUsuario: boolean}>("/session", {withCredentials: true}));
        this.authSubject.next(true);
        return permitido;
      }catch(error){
        this.authSubject.next(false);
        return error;
      }              
    }


    logIn(usuario: string, clave:string): Observable<HttpResponse<Object>> {

      return this.http.post<Object>("/login", {username: usuario, password:clave}, {observe: "response"});

    }


    logOut():Observable<any>{

      return this.http.post("/logout",{}, {withCredentials:true}).pipe(
        tap(()=> this.authSubject.next(false))
      )


    }

  
}
