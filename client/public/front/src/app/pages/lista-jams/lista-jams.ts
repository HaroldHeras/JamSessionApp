import { Component, OnInit } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RouterModule, Router } from "@angular/router";
import { Jam } from '../../interfaces/Jam.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalDelete } from '../modal-delete/modal-delete';


@Component({
  selector: 'app-lista-jams',
  imports: [FormsModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-jams.html',
  styleUrl: './lista-jams.css'
})
export class ListaJams implements OnInit {

  jams$:Observable<Jam[]> | undefined;

  constructor(private router:Router, private jams:Jams, private dialog: MatDialog){
  }


  ngOnInit(): void {
    this.jams.cargaPrivateJams()   
    this.jams$ = this.jams.privateJams$;
  }


  switchJam(id:string, activated:boolean):void{

    this.jams.updateJam(id, {activated: !activated}).subscribe();

  }

  borrarJam(id:string):void{

    this.jams.borraJam(id).subscribe()

  }

  abrirModal(nombre:string, id:string):void{

    const dialogRef = this.dialog.open(ModalDelete, {
        width: "250px",
        data:{
          nombre
        }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        console.log(confirm)
        if(confirm) this.borrarJam(id)
      }
    );
  }

  

}
