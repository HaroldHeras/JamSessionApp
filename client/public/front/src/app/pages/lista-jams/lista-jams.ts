import { Component, OnInit } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RouterModule, Router } from "@angular/router";
import { Jam } from '../../interfaces/Jam.interface';

@Component({
  selector: 'app-lista-jams',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './lista-jams.html',
  styleUrl: './lista-jams.css'
})
export class ListaJams implements OnInit {

  jams$:Observable<Jam[]> | undefined;

  ventanaModal:boolean = false;

  idBorrar: string = "";
  nombreBorrar: string = "";
  

  constructor(private router:Router, private jams:Jams){
  }


  ngOnInit(): void {
    this.jams.cargaPrivateJams()   
    this.jams$ = this.jams.privateJams$;
  }


  redirige(event:Event){

    const elemento = event.target as HTMLElement;

    if(elemento.id==="boton-nuevaJam"){
      this.router.navigate(["jamController/nuevaJam"])
      return;
    } 

  }

  switchJam(id:string, activated:boolean):void{

    this.jams.updateJam(id, {activated: !activated}).subscribe();

  }

  borrarJam():void{

    this.jams.borraJam(this.idBorrar).pipe(
      tap(()=> this.cerrarModal() )
    ).subscribe()

  }

  abrirModal(nombre:string, id:string):void{

    this.nombreBorrar = nombre;
    this.idBorrar = id;
    this.ventanaModal = true;
  }

  cerrarModal():void{
    this.nombreBorrar = "";
    this.idBorrar = "";
    this.ventanaModal = false;
  }
 

  

}
