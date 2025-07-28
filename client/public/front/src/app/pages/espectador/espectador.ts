import { Component } from '@angular/core';

@Component({
  selector: 'app-espectador',
  imports: [],
  templateUrl: './espectador.html',
  styleUrl: './espectador.css'
})
export class Espectador {


  saluda(){

    alert("Saludos desde Espectador!")

  }

}
