import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-jams',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-jams.html',
  styleUrl: './lista-jams.css'
})
export class ListaJams implements OnInit {

  jams$;
  

  constructor(private router:Router, private jams:Jams){
    this.jams$ = this.jams.privateJams$;
  }


  ngOnInit(): void {

    this.jams.cargaPrivateJams()
    
      
  }


  redirige(event:Event){

    const elemento = event.target as HTMLElement;

    if(elemento.id==="boton-nuevaJam"){
      this.router.navigate(["jamController/nuevaJam"])
      return;
    } 

  }

  switchJam(event:Event){

    const elemento = event.target as HTMLElement;

    const activo = elemento.parentElement?.getAttribute("data-activated")==="true" ? true : false;
    const id = elemento.parentElement?.id;

    this.jams.updateJam(id, !activo).subscribe();

  }
 

  

}
