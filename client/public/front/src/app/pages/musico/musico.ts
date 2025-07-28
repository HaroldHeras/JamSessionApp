import { Component } from '@angular/core';

@Component({
  selector: 'app-musico',
  imports: [],
  templateUrl: './musico.html',
  styleUrl: './musico.css'
})
export class Musico {


  saluda(){
    alert("Saludos desde Musico!")
  }

}
