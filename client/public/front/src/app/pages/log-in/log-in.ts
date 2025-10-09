import { Component, signal } from '@angular/core';
import { Router} from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LogIn {


  acceso:boolean | null = null;
  mensaje:string = "";
  hide = signal(true);


  constructor(private authService:Auth, private router:Router){}

  clickEvent(event:MouseEvent) {
    const pointer = event as PointerEvent;
    if(pointer.pointerType === "mouse"){
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
   
  }

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
