import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LogIn {


  acceso:boolean | null = null;
  mensaje:string = "";

  constructor(private authService:Auth, private router:Router){}

  async logIn(nombreUsuario:string, password:string){


    const autorizado = await this.authService.logIn(nombreUsuario, password);


    if(autorizado.ok){

      this.acceso = autorizado.ok;
      this.mensaje = "Contraseña correcta. Redirigiendo al controlador...";


      setTimeout(()=>{
        this.router.navigate(["/jamController"]);

      },3000);        

    }else{
      this.acceso = autorizado.ok;
      this.mensaje = autorizado.error.message;
    }


  }





}
