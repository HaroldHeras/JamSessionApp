import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDivider} from '@angular/material/divider';



@Component({
  selector: 'app-jam-controller',
  imports: [RouterOutlet, MatDivider],
  templateUrl: './jam-controller.html',
  styleUrl: './jam-controller.css'
})
export class JamController {
  
}
