import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LogIn {


  acceso:boolean | null = null;
  mensaje:string = "";

  constructor(private authService:Auth, private router:Router){}

  logIn(nombreUsuario:string, password:string){

    this.authService.logIn(nombreUsuario,password).subscribe({
      next: (data)=> {
        this.acceso = data.ok
        this.mensaje = "Contraseña correcta. Redirigiendo al controlador..."
        setTimeout(()=>{
          this.router.navigate(["/jamController"]); 
        },1500);   
      },
      error: (err)=>{
        this.acceso = err.ok
        this.mensaje = err.error.message
      }
    })
  }





}
