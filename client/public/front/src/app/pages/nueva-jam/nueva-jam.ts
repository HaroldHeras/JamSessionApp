import { Component } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-jam',
  imports: [FormsModule, CommonModule],
  templateUrl: './nueva-jam.html',
  styleUrl: './nueva-jam.css'
})
export class NuevaJam {

  mensaje:string = "";
  ok:boolean | null = null;
  

  constructor(private jams:Jams, private router:Router){}

  async creaJam(nombreJam:string){

    try{
      const respuesta = await this.jams.crearJam(nombreJam);
      
      this.mensaje = "Jam creada correctamente";
      this.ok = respuesta.ok;
      setTimeout(()=>{
        this.router.navigate(["/jamController"]);
      }, 1500)
      return;
      

    }catch(error:any){
      this.mensaje = error.error.message;
      this.ok=error.ok;
      return
    }

  }

}
