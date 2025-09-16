import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  auth$;

  constructor(private router:Router, private authService:Auth){
    this.authService.autenticacion()
    this.auth$ = this.authService.auth$;         

  }

  redirige(evento:Event){

    const elemento = evento.target as HTMLElement;

      
    if(elemento.id==="boton-inicio")  this.router.navigate(["/"]);
    if(elemento.id==="boton-login")  this.router.navigate(["/login"]);
    if(elemento.id==="boton-control")  this.router.navigate(["/jamController"]);
    if(elemento.id==="boton-logout"){
      this.authService.logOut().pipe(            
        tap(()=> this.router.navigate(["/login"]))
      ).subscribe()
    } 
     


  }

}
