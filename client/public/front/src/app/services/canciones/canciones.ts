import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cancion } from '../../interfaces/Cancion.interfaz';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Canciones {


  private cancionesSubject:BehaviorSubject<Cancion[]> = new BehaviorSubject<Cancion[]>([]);
  canciones$ = this.cancionesSubject.asObservable();

  constructor(private http:HttpClient){}

  cargaCanciones(){

    this.http.get<Cancion[]>("/cancionesAll").subscribe({
      next: (data)=> this.cancionesSubject.next(data),
      error: (err)=> console.error(err)
      
    });

  }

  creaCancion(cancionNueva:Partial<Cancion>): Observable<{ok:boolean, cancionNueva:Cancion}>{

    return this.http.post<{ok:boolean, cancionNueva:Cancion}>("/canciones", cancionNueva).pipe(
      tap((res)=>{
        const canciones = [...this.cancionesSubject.getValue()];
        canciones.unshift(res.cancionNueva);
        this.cancionesSubject.next(canciones);
      })
    );

  }

  editaCancion(id:string, cancionBody:Partial<Cancion>){
      return this.http.put<Cancion>("/canciones", {id, cancionBody}).pipe(
        tap((res)=>{
          const canciones = [...this.cancionesSubject.getValue()];
          const cancionesActualizadas= canciones.map((c)=>{
            if(c.id===id) return res
            return c;
          })
           this.cancionesSubject.next(cancionesActualizadas);
        })
      )
  }

  borraCancion(id:string):Observable<any>{
    
        return this.http.delete<{message:string}>("/canciones/"+id).pipe(
          tap((res)=> {
            const canciones = this.cancionesSubject.getValue();
            const cancionesActualizadas = canciones.filter((c)=> c.id !== id)
            this.cancionesSubject.next(cancionesActualizadas)
          })
        );
      
  }

  
}
