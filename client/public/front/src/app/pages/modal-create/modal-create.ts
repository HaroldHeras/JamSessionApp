import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,} from '@angular/forms';
@Component({
  selector: 'app-modal-create',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './modal-create.html',
  styleUrl: './modal-create.css'
})
export class ModalCreate {

  readonly dialogRef = inject(MatDialogRef<this>);
  readonly data = inject(MAT_DIALOG_DATA);
  cancion = {nombre:this.data.nombre || "", artista:this.data.artista || ""}
  readonly requiredOk = signal(true);

  
  

  validaCampos(){
    
    if(this.cancion.nombre.trim() === "" || this.cancion.artista.trim() === ""){
        this.requiredOk.set(false);
        setTimeout(()=>{this.requiredOk.set(true)},2000);
        return;
    }
    this.dialogRef.close(this.cancion);
  }

}
