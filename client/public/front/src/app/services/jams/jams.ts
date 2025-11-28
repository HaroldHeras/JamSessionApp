import { HttpClient, HttpResponse } from '@angular/common/http';
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

    this.http.get<Jam[]>("/jamsAll?visible=true").subscribe({
      next: (data)=>{
        if(data.length!==0) return this.publicJamSubject.next(data)
        return this.publicJamSubject.next([])
      }, 
      error: (err)=> console.error(err.error.message)
      
    });

  }

  crearJam(jam:Partial<Jam>):Observable<HttpResponse<Jam>>{

    return this.http.post<Jam>("/jam", jam, {observe: "response"});
  }

  getJam(id:string):Observable<Jam>{

    return this.http.get<Jam>("/jam/"+id);

  }

  updateJam(id: string, jamBody: Partial<Jam>):Observable<HttpResponse<Jam>>{

    return this.http.put<Jam>("/jam", {id, jamBody}, {observe: "response"}).pipe(
      tap((res)=>{

        const jams = this.privateJamSubject.getValue();
        const jamsActualizadas = jams.map((j)=>{
          if(j._id===id && res.body) return res.body
          return j
        })
        this.privateJamSubject.next(jamsActualizadas)
      })
    );

  }

  borraJam(id:string):Observable<any>{
    return this.http.delete<string>("/jam/"+id).pipe(
      tap((res)=> {
        const jams = this.privateJamSubject.getValue();
        const jamsActualizadas = jams.filter((j)=> j._id !== id)
        this.privateJamSubject.next(jamsActualizadas)
      })
    );
  }

   
  
}


