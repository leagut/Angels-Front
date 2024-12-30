import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  productosBajoStock: string[] = []; // Lista para almacenar los nombres de productos de bajo stock
  error: string | null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerProductosBajoStock();
  }

  obtenerProductosBajoStock(): void {
    this.productsService.getAllProductfaltante().subscribe({
      next: (productos) => {
        this.productosBajoStock = productos; // Asigna la respuesta al array
        console.log(this.productosBajoStock); // Muestra los productos en consola
      },
      error: (err) => {
        this.error = 'Error al obtener productos: ' + err.message; // Maneja el error
        console.error('Error al obtener productos:', err); // Log de error para depuración
      }
    });
  }
  


}
