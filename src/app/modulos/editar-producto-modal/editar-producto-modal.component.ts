import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.css']
})
export class EditarProductoModalComponent {
  editarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editarForm = this.fb.group({
      nombre: [data.nombre],  // Asegúrate de que coincida con lo que pasas desde AdminComponent
      precio: [data.precio],
      stock: [data.stock],
      Id:[data.Id]
    });
  }

  onSubmit() {
    // Lógica para enviar los datos actualizados
    if (this.editarForm.valid) {
      this.dialogRef.close(this.editarForm.value); // Cerrar el modal con los datos del formulario
    }
  }

  close() {
    this.dialogRef.close();
  }
}


