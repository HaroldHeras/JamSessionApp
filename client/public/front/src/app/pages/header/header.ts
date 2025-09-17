import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  auth$;

  constructor(private router:Router, private authService:Auth){
    this.authService.autenticacion()
    this.auth$ = this.authService.auth$;         

  }

  logOut():void{
    this.authService.logOut().pipe(            
        tap(()=> this.router.navigate(["/login"]))
      ).subscribe()
  }

  

}
