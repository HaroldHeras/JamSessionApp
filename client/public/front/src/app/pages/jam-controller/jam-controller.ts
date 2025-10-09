import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-jam-controller',
  imports: [RouterOutlet, MatDividerModule],
  templateUrl: './jam-controller.html',
  styleUrl: './jam-controller.css'
})
export class JamController {
  
}
