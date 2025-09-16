import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Jam } from '../../interfaces/Jam.interface';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  jams$;

  constructor(private router:Router, private jams:Jams){
    this.jams.cargaPublicJams();

    this.jams$ = this.jams.publicJams$;
  }

  ngOnInit(): void {
    

  }



  redirige(event: Event){

    console.log("Esto es una cooki", document.cookie);

    const elemento = event.target as HTMLElement;

    console.log("Este es el elemento: ", elemento)
    console.log("Este es su texto: ", elemento.innerText)

    if(elemento.id==="espectador"){

        this.router.navigate(["/espectador"])

    }else{

        this.router.navigate(["/musico"])


    }
    
  }



}
