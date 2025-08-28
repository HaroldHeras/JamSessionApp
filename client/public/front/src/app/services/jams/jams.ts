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

   private jamSubject:BehaviorSubject<Jam[]> = new BehaviorSubject<Jam[]>([])
  jams$ = this.jamSubject.asObservable();
  

  constructor(private http:HttpClient){}

  cargaJams():void{

    this.http.get<Jam[]>("/jamsAll").subscribe({
      next: (data)=> this.jamSubject.next(data),
      error: (err)=> console.error(err.error.message)
      
    });

  }

  crearJam(nombre:string, canciones:Cancion[]):Observable<{ok:boolean, jamNueva:Jam}>{

    return this.http.post<{ok:boolean, jamNueva:Jam}>("/jams", {nombre, canciones}).pipe(
      tap(()=> this.cargaJams())
    );

    
  }

   
  
}


