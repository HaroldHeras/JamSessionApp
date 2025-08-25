import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Jams {

  constructor(private http:HttpClient){}

  async crearJam(nombre:string): Promise<any>{

    try{
      
      const respuesta = await firstValueFrom(this.http.post("/jams", {nombre}));
      return respuesta;

    }catch(error:any){
      throw error;
    }
  }
  
}
