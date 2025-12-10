import { Component, computed, inject} from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Cancion } from '../../interfaces/Cancion.interfaz';
import { Canciones } from '../../services/canciones/canciones';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from "@angular/forms";
import { MatButton } from '@angular/material/button';
import { CancionEnJam } from '../../interfaces/CancionEnJam.interface';

@Component({
  selector: 'app-modal-add-canciones',
  imports: [MatDialogModule, MatCheckboxModule, MatTableModule, FormsModule, MatButton],
  templateUrl: './modal-add-canciones.html',
  styleUrl: './modal-add-canciones.css'
})
export class ModalAddCanciones {

  readonly data:CancionEnJam[] = inject(MAT_DIALOG_DATA);
  displayedColumns:string[] = ["NOMBRE", "ARTISTA", " "];
  cancionesSignal;
  seleccion:CancionEnJam[] = []
  private readonly idsCancionesAgregadas = new Set(this.data.map(c=> c.id));
  public readonly cancionesDisponibles = computed(()=>{
    return this.cancionesSignal().filter(c=> !this.idsCancionesAgregadas.has(c.id))
  })


  constructor(private canciones:Canciones){
    this.canciones.cargaCanciones()
    this.cancionesSignal = toSignal(this.canciones.canciones$,{initialValue:[] as Cancion[]});
  }

  

  switchCancion(cancion:Cancion,checked:boolean){

    if(checked){
      this.seleccion = [...this.seleccion, {...cancion, participantes:[]}];
    }else{
      this.seleccion = this.seleccion.filter(c=> c.id!==cancion.id);
    }  
  }

  

  



}
