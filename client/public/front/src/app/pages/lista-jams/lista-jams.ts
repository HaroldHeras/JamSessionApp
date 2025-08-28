import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jams } from '../../services/jams/jams';
import { Jam } from '../../interfaces/Jam.interface';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.jams$ = this.jams.jams$;
  }


  ngOnInit(): void {

    this.jams.cargaJams()
    
      
  }


  redirige(event:Event){

    const elemento = event.target as HTMLElement;

    if(elemento.id==="boton-nuevaJam"){
      this.router.navigate(["jamController/nuevaJam"])
      return;
    } 

  }
 

  

}
