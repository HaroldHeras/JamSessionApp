import { Component, signal } from '@angular/core';
import { Router} from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { HttpResponse } from '@angular/common/http';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule, MatInput, MatFormFieldModule, MatIcon, MatButton],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LogIn {

  usuario:string = "";
  password:string = "";
  acceso = signal(true);
  mensaje = signal("");
  hide = signal(true);


  constructor(private authService:Auth, private router:Router){}

  clickEvent(event:MouseEvent) {
    const pointer = event as PointerEvent;
    if(pointer.pointerType === "mouse"){
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
   
  }

  validaCampos(){
    if(this.usuario.trim().length < 6){
      this.acceso.set(false);
      this.mensaje.set("El nombre de usuario debe contener mínimo 6 carácteres")
      return;
    }
    if(this.password.trim().length < 9){
      this.acceso.set(false);
      this.mensaje.set("La contraseña debe contener mínimo 9 carácteres")
      return;
    }

    this.logIn();
  }

  logIn(){

    this.authService.logIn(this.usuario,this.password).subscribe({
      next: (response: HttpResponse<any>)=> {
        if(response.status===200){
          this.acceso.set(true);
          this.mensaje.set("Contraseña correcta. Redirigiendo al controlador...")
          setTimeout(()=>{
            this.router.navigate(["/jamController"]); 
          },1500);   
        }
      },
      error: (err)=>{
        if(err.status===401){
          this.acceso.set(false)
          this.mensaje.set(err.error.message);
        }
      }
    })
  }





}
