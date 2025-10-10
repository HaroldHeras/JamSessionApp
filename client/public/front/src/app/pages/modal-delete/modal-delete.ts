import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-delete',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.css'
})
export class ModalDelete {

  data = inject(MAT_DIALOG_DATA);
}
