import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


  constructor(private router:Router){}

  redirige(event: Event){

    const elemento = event.target as HTMLElement;

    console.log("Este es el elemento: ", elemento)
    console.log("Este es su texto: ", elemento.innerText)

    if(elemento.innerText==="Espectador"){

        this.router.navigate(["/espectador"])

    }else{

        this.router.navigate(["/musico"])


    }
    
  }



}
