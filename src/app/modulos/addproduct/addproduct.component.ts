import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';

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
    private dialogRef: MatDialogRef<AddproductComponent>,
    private  productService : ProductsService 
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

  private getCategoriaId(categoria: string): number {
    const categorias: Record<string, number> = {
        'belleza': 4,
        'alimenticio': 5,
        'aseo-personal': 6,
        'limpieza': 7
    };
    return categorias[categoria] || 0; // Retorna 0 o algún valor por defecto si no coincide
}


onSave(): void {
  if (this.productForm.valid) {
      // Clonamos el objeto para evitar modificar directamente el formulario
      const productData = { ...this.productForm.value };

      // Convertimos el nombre de la categoría en su ID numérico y lo asignamos a categoryId
      productData.categoryId = this.getCategoriaId(productData.categoryId);

      console.log("Datos a enviar:", productData); // Confirmamos que los datos están en el formato correcto

      // Llamada al servicio para guardar el producto
      this.productService.addProduct(productData).subscribe(
          response => {
              console.log("Producto guardado con éxito:", response);
              this.dialogRef.close(productData);
          },
          error => console.error("Error al guardar el producto:", error)
      );
  }
}




 




}
