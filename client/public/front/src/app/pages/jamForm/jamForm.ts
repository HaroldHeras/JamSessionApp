import { Component, computed, signal} from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { Jam } from '../../interfaces/Jam.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { MatButton } from "@angular/material/button";



@Component({
  selector: 'app-nueva-jam',
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatTimepickerModule, MatDatepickerModule, MatButton],
  templateUrl: './jamForm.html',
  styleUrl: './jamForm.css',
  providers: [provideNativeDateAdapter()]
})
export class JamForm {

  jamId:string | null = null;
  modoEdicion:boolean = false;
  mensaje:string = "";
  ok:boolean | null = null;
  nombre:string = "";
  fecha!:Date;
  instrumentos= signal([{nombre: ""}])
  ubicacion = {
    direccion:"",
    url:""
  }


  

  // Estado con Signals
  direccion = signal(""); // Valor inicial
  busqueda = signal(""); // Dirección seleccionada

  // Propiedad computada para generar el iframe src
  //El tipo de retorno es SafeResourceUrl, no string
  mapUrl = computed<SafeResourceUrl | null>(() => {
    const busqueda = this.busqueda();
    if (busqueda.trim().length===0) return null;
    
    // Generación de la URL del iframe de Google Maps
    const encodedAddress = encodeURIComponent(busqueda);
    const url =`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    this.ubicacion.direccion = this.busqueda();
    this.ubicacion.url = url;
    
    // 3. Sanitizamos la URL para que Angular la acepte
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
  
// 1. Inyectamos el servicio DomSanitizer
  constructor(private jams:Jams, private router:Router, private sanitizer:DomSanitizer, private actRoute:ActivatedRoute){}

  ngOnInit():void{

    this.jamId = this.actRoute.snapshot.paramMap.get('id');

    if(this.jamId){
      this.modoEdicion = true;
      this.cargaDatosJam(this.jamId);
    }
  }

  cargaDatosJam(id:string):void{

    this.jams.getJam(id).subscribe({
      next: data=>{
        this.nombre = data.nombre;
        this.fecha = data.fecha;
        this.instrumentos.set(data.instrumentos)
        this.direccion.set(data.ubicacion.direccion);
        this.busqueda.set(data.ubicacion.direccion);
      }
    })
  }

  validaCampos():void{
    if(this.nombre.trim()===""){
      this.ok = false;
      this.mensaje = "Debe escribir un nombre para la Jam Session"
      return;
    }
    if(this.fecha < new Date() || this.fecha===undefined){
      this.ok = false;
      this.mensaje = "La fecha y hora de la Jam no puede ser anterior a la de hoy"
      return;
    }
    if(this.instrumentos().find(i=>i.nombre.trim()==="")){      
      this.ok = false;
      this.mensaje = "Debe rellenar todos los campos habilitados para instrumentos";
      return;
    }
    
    if(this.modoEdicion){
      this.actualizaJam()
    }else{
      this.creaJam()
    }
  }  
  

  creaJam():void{
      const jam = {
        nombre:this.nombre,
        fecha: this.fecha,
        instrumentos: this.instrumentos(),
        ubicacion:this.ubicacion
      }    
      this.jams.crearJam(jam).subscribe({
        next: (response:HttpResponse<Jam>)=>{
          if(response.status===201){
            this.mensaje = "Jam creada correctamente";
            this.ok = true;
            setTimeout(()=>{
              this.router.navigate(["/jamController"]);
            }, 1500)
          }
        },
        error: (err)=>{
          this.mensaje = err.error.message;
          this.ok=false;
          setTimeout(() => {
            this.mensaje = "";
          }, 2000);
        } 
      });
      
  }

  actualizaJam():void{
      const jam = {
        nombre:this.nombre,
        fecha: this.fecha,
        instrumentos: this.instrumentos(),
        ubicacion:this.ubicacion
      }

      this.jams.updateJam(this.jamId!, jam).subscribe({
        next: (response:HttpResponse<Jam>)=>{
          if(response.status===214){
            this.mensaje = "Jam actualizada correctamente";
            this.ok = true;
            setTimeout(()=>{
              this.router.navigate(["/jamController/jam/", this.jamId]);
            }, 1500)
          }
        },
        error: (err)=>{
          this.mensaje = err.error.message;
          this.ok=false;
          setTimeout(() => {
            this.mensaje = "";
          }, 2000);
        } 

      })
      
      
  }


  nuevoInstrumento(){
    this.instrumentos.update(arr=>[...arr, {nombre:""}]);
  }

  eliminaInstrumento(index:number){
    this.instrumentos.update(arr=> arr.filter((instrumento, indice)=> indice!==index))
  }


  resetDireccion(){
    this.direccion.set("");
    this.busqueda.set("");
    this.ubicacion.direccion = "";
    this.ubicacion.url = "";
  }



}
