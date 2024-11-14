import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from 'src/app/modulos/addproduct/addproduct.component';
import { EditarProductoModalComponent } from 'src/app/modulos/editar-producto-modal/editar-producto-modal.component';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {

  cargo: string | null = null;
  name: string | null = null;

  productsData:Array<any>=[];

  constructor( private  ProductService : ProductsService , private dialog: MatDialog  ) { }

  ngOnInit(): void {
    this.cargo = sessionStorage.getItem('rol');
    this.name = sessionStorage.getItem('username');  

    this.ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsData = res;
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

   // throw new Error('Method not implemented.');
  }


  openProductModal(): void {
    const dialogRef = this.dialog.open(AddproductComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del producto:', result);
        // Aquí puedes procesar el resultado o enviar los datos a un servicio
      }
    });
  }




  editarProducto(producto: any) {
    const dialogRef = this.dialog.open(EditarProductoModalComponent, {
      width: '320px',
      data: { nombre: producto.name, precio: producto.price, stock: producto.stock, Id : producto.productId } // Asegúrate de que los nombres coincidan con los usados en el modal
    });   


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto actualizado:', result);
        
        // Llama al servicio para actualizar el producto
        this.ProductService.updateProduct({ 
          id: result.Id, // Asegúrate de que esto coincida con el nombre del campo
          name: result.nombre,  // Cambia 'nombre' a 'name'
          price: parseFloat(result.precio), // Cambia 'precio' a 'price', asegurándote de convertirlo a número
          stock: parseInt(result.stock, 10) // Cambia 'stock' a 'stock', asegurándote de convertirlo a entero
        }).subscribe({
          next: (res) => {
            console.log('Producto actualizado correctamente:', res);
            // Aquí puedes actualizar la lista de productos o mostrar un mensaje
          },
          error: (err) => {
            console.error('Error al actualizar el producto:', err);
          }
        });
      }
    });

  }


  onoff(producto: any) {
    console.log("xzdf",producto);
    
    const nuevoEstado = !producto.active;  // Invertimos el estado actual de active
    
    console.log(nuevoEstado);
    
    console.log(producto.productId);
    
    // Llamamos al servicio para actualizar el estado en el backend
    this.ProductService.updateProductActive(producto.productId, nuevoEstado).subscribe({
      next: (response) => {
        // Actualizamos el estado en el frontend para reflejar el cambio
        producto.active = nuevoEstado;
      },
      error: (err) => {
        console.error('Error al cambiar el estado del producto:', err);
      }
    });
  }
  


}









