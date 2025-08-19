import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(private router:Router){}

  redirige(evento:Event){

    const elemento = evento.target as HTMLElement;

      
    if(elemento.classList.contains("boton-inicio"))  this.router.navigate(["/"]);

    if(elemento.classList.contains("boton-login"))  this.router.navigate(["/login"]);    

  }

}
