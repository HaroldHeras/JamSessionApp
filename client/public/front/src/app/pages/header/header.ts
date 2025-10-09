import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import {  Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  auth$;

  isMobile$;

  constructor(private router:Router, private authService:Auth, private breakpointObserver: BreakpointObserver){
    this.authService.autenticacion()
    this.auth$ = this.authService.auth$; 
    this.isMobile$ = breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    )
  }


  logOut():void{
    this.authService.logOut().pipe(            
        tap(()=> this.router.navigate(["/login"]))
      ).subscribe()
  }

  

}
