import { Component, OnInit } from '@angular/core';
import { Jams } from '../../services/jams/jams';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';
import {RouterLink } from "@angular/router";
import { Jam } from '../../interfaces/Jam.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-jams',
  imports: [FormsModule, CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './lista-jams.html',
  styleUrl: './lista-jams.css'
})
export class ListaJams implements OnInit {

  jams$!:Observable<Jam[]>;

  constructor(private jams:Jams, private dialog: MatDialog){
  }


  ngOnInit(): void {
    this.jams.cargaPrivateJams()   
    this.jams$ = this.jams.privateJams$;
    
  }


  switchJam(id:string, visible:boolean):void{

    this.jams.updateJam(id, {visible: !visible}).subscribe();

  }

  borrarJam(id:string):void{

    this.jams.borraJam(id).subscribe()

  }

  modalDelete(nombre:string, id:string, type:string):void{    

    //Importamos el componente "ModalDelete" de esta forma favoreciendo el LazyLoad
    import("../modal-delete/modal-delete")
      .then(({ModalDelete})=>{

        const dialogRef = this.dialog.open(ModalDelete, {
            width: "250px",
            data:{
              nombre,
              type
            }
        });
    
        dialogRef.afterClosed().subscribe(
          confirm => {
            if(confirm) this.borrarJam(id)
          }
        );


      }).catch(err=>{
        console.error("Error al cargar 'ModalDelete'", err)
      })

  }

  

}
