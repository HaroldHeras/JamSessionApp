import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Jam } from '../../interfaces/Jam.interface';
import { Observable } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  jams$!: Observable<Jam[]>;

  constructor(private router:Router, private jams:Jams){}

  ngOnInit(): void {
    this.jams.cargaPublicJams();
    this.jams$ = this.jams.publicJams$;

  }



  



}
