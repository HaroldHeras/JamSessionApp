import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jam } from '../../interfaces/Jam.interface';
import { Jams } from '../../services/jams/jams';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-jam-detail-private',
  imports: [AsyncPipe],
  templateUrl: './jam-detail-private.html',
  styleUrl: './jam-detail-private.css'
})
export class JamDetailPrivate implements OnInit {

  id!:string;
  jam$!:Observable<Jam>

  constructor(private route:ActivatedRoute, private jams:Jams){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id") || ""
    this.getJam();
  }

  getJam(){
    this.jam$ = this.jams.getJam(this.id)
  }




}
