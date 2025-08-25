import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-jams',
  imports: [],
  templateUrl: './lista-jams.html',
  styleUrl: './lista-jams.css'
})
export class ListaJams {

  constructor(private router:Router){}


  redirige(event:Event){

    const elemento = event.target as HTMLElement;

    if(elemento.id==="boton-nuevaJam"){
      this.router.navigate(["jamController/nuevaJam"])
      return;
    } 

  }

}
