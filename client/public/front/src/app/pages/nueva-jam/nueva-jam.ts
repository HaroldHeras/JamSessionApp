import { Component } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cancion } from '../../interfaces/Cancion.interfaz';

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

  creaJam(nombreJam:string, canciones:Cancion[] = []):void{

    
      this.jams.crearJam(nombreJam, canciones).subscribe({
        next: (data)=>{
          this.mensaje = "Jam creada correctamente";
          this.ok = data.ok;
          setTimeout(()=>{
            this.router.navigate(["/jamController"]);
          }, 1500)
        },
        error: (err)=>{
          this.mensaje = err.error.message;
          this.ok=err.ok;
        } 
      });
      
  }

}
