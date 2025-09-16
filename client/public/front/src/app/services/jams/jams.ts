import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jam } from '../../interfaces/Jam.interface';
import { Cancion } from '../../interfaces/Cancion.interfaz';



@Injectable({
  providedIn: 'root'
})

export class Jams {

   private privateJamSubject:BehaviorSubject<Jam[]> = new BehaviorSubject<Jam[]>([])
   private publicJamSubject:BehaviorSubject<Jam[]> = new BehaviorSubject<Jam[]>([]);
  privateJams$ = this.privateJamSubject.asObservable();
  publicJams$ = this.publicJamSubject.asObservable();
  

  constructor(private http:HttpClient){}

  cargaPrivateJams():void{

    this.http.get<Jam[]>("/jamsAll").subscribe({
      next: (data)=> this.privateJamSubject.next(data),
      error: (err)=> console.error(err.error.message)
      
    });

  }


  cargaPublicJams():void{

    this.http.get<Jam[]>("/jamsAll?activated=true").subscribe({
      next: (data)=>{
        if(data.length!==0) return this.publicJamSubject.next(data)
        return this.publicJamSubject.next([])
      }, 
      error: (err)=> console.error(err.error.message)
      
    });

  }

  crearJam(nombre:string, canciones:Cancion[]):Observable<{ok:boolean, jamNueva:Jam}>{

    return this.http.post<{ok:boolean, jamNueva:Jam}>("/jams", {nombre, canciones}).pipe(
      tap(()=> this.cargaPrivateJams())
    );

    
  }

  updateJam(id:string | any, activated:boolean):Observable<Object>{

    return this.http.post<Object>("/jamUpdate", {id, activated}).pipe(
      tap(()=> this.cargaPrivateJams() )
    );

  }

   
  
}


