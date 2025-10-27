import { Component, computed, signal } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-nueva-jam',
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatTimepickerModule, MatDatepickerModule],
  templateUrl: './nueva-jam.html',
  styleUrl: './nueva-jam.css',
  providers: [provideNativeDateAdapter()]
})
export class NuevaJam {

  mensaje:string = "";
  ok:boolean | null = null;
  nombre:string = "";
  fecha!:Date;

  // Estado con Signals
  direccion = signal(""); // Valor inicial
  busqueda = signal(''); // Dirección seleccionada

  // Propiedad computada para generar el iframe src
  // 2. El tipo de retorno es SafeResourceUrl, no string
  mapUrl = computed<SafeResourceUrl | null>(() => {
    const busqueda = this.busqueda();
    if (!busqueda) return null;
    
    // Generación de la URL del iframe de Google Maps
    const encodedAddress = encodeURIComponent(busqueda);
    const url = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    
    // 3. Sanitizamos la URL para que Angular la acepte
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
  
// 1. Inyectamos el servicio DomSanitizer
  constructor(private jams:Jams, private router:Router, private sanitizer:DomSanitizer){}
  

  creaJam():void{
      const jam = {
        nombre:this.nombre,
        fecha: this.fecha,
      }    
      this.jams.crearJam(jam).subscribe({
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
