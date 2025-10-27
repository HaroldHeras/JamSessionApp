import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancion } from '../../interfaces/Cancion.interfaz';
import { Canciones } from '../../services/canciones/canciones';
import { AsyncPipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { ModalDelete } from '../modal-delete/modal-delete';
import { ModalCreate } from '../modal-create/modal-create';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-lista-canciones',
  imports: [AsyncPipe, MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './lista-canciones.html',
  styleUrl: './lista-canciones.css'
})
export class ListaCanciones {

  canciones$!:Observable<Cancion[]>;
  displayedColumns:string[] = ["NOMBRE", "ARTISTA", " "];
  message:string = "";
  messageVisible:boolean=false;

  constructor(private canciones:Canciones, private dialog: MatDialog){}

  ngOnInit(){

    this.canciones.cargaCanciones();
    this.canciones$ = this.canciones.canciones$;

  }

  creaCancion(type:string){

    const dialogRef = this.dialog.open(ModalCreate, {
          width: "250px",
          data:{
            type
          }
    });
  
    dialogRef.afterClosed().subscribe(
      result => {
          if(result!==undefined){
            this.canciones.creaCancion(result.nombre, result.artista).subscribe({
              error:(err)=>{
                this.message = err.error.message;
                this.messageVisible=true;
                setTimeout(()=>{
                  this.messageVisible=false
                  this.message="";
                }, 2000);
              }
            });
          } 
      }
    );
  }

  editarCancion(type:string, cancion:Cancion){

    const dialogRef = this.dialog.open(ModalCreate, {
          width: "250px",
          data:{
            type,
            nombre:cancion.nombre,
            artista: cancion.artista
          }
      });
  
      dialogRef.afterClosed().subscribe(
        result => {
          if(result!==undefined){
            this.canciones.editaCancion(cancion._id,{nombre:result.nombre, artista:result.artista}).subscribe({
              error:(err)=>{
                this.message = err.error.message;
                this.messageVisible=true;
                setTimeout(()=>{
                  this.messageVisible=false
                  this.message="";
                }, 2000);
              }
            });
          } 
        }
      );

  }

  borrarCancion(id:string, nombre:string, type:string):void{

    const dialogRef = this.dialog.open(ModalDelete, {
          width: "250px",
          data:{
            nombre,
            type
          }
      });
  
      dialogRef.afterClosed().subscribe(
        confirm => {
          if(confirm) this.canciones.borraCancion(id).subscribe();
        }
      );

  };

  



  


}
