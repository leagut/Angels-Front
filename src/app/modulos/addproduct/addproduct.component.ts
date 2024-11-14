import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  productForm: FormGroup;

  categories = [
    { value: 'belleza', viewValue: 'Belleza' },
    { value: 'alimenticio', viewValue: 'Alimenticio' },
    { value: 'aseo-personal', viewValue: 'Aseo Personal' },
    { value: 'limpieza', viewValue: 'Limpieza' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddproductComponent>
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      active: [false]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

}
