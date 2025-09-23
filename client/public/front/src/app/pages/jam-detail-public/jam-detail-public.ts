import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Jam } from '../../interfaces/Jam.interface';
import { ActivatedRoute } from '@angular/router';
import { Jams } from '../../services/jams/jams';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-jam-detail-public',
  imports: [AsyncPipe],
  templateUrl: './jam-detail-public.html',
  styleUrl: './jam-detail-public.css'
})
export class JamDetailPublic {


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
