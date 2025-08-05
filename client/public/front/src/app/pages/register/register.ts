import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


  constructor(private router:Router){}


  resultadoRegistroMensaje:string = "";
  resultadoRegistroBoolean:boolean | null = null;


  async registroSuperUsuario(username:string, password:string, passwordRepe:string){

    
    try{

      if(password!==passwordRepe){

        this.resultadoRegistroMensaje = "Ambas contraseñas deben coincidir"
        this.resultadoRegistroBoolean = false;
        return;        

      }
      
      const usuario = {username, password, superUsuario:true};

      const respuesta = await fetch("/user-repository", {
        method: "POST",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify(usuario)
      })

      

      if(!respuesta.ok){
        const resultado = await respuesta.text();  
        this.resultadoRegistroMensaje = resultado;
        this.resultadoRegistroBoolean = false;

        return;

      }else{

        const resultado = await respuesta.json();  
        this.resultadoRegistroMensaje = "Registrado correctamente. Redirigiendo..."
        this.resultadoRegistroBoolean = true;

        setTimeout(()=>{

          this.router.navigate(["/login"])


        },1500)

        return;

      } 

      

    }catch(error){
      throw error;       
    }
      



  }


  async login(){

    await fetch("/register", {
      method: "POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify({
        message: "Hola"
      })
    });
    

  }


}
