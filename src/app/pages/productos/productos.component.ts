import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private  ProductService : ProductsService , private cartService: CartService ){}

  productsData:Array<any>=[];
  searchText: string = ''; 


  ngOnInit(): void {

    this.ProductService.getAllProductsFilter().subscribe({
      next:(res)=>{
        console.log('Datos recibidos:', res);
        this.productsData = res;
        
        
      },
      error:(err)=>{
        console.log(err);
        console.error('Error completo:', err);
      },
      complete: () => {
        console.log('Petición completada'); // Agregamos log de completado
        console.log('Datos en productsData:', this.productsData); // Verificamos los datos asignados
      }
    })

  //  throw new Error('Method not implemented.');
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
    console.log('Producto agregado al carrito:', product);
  }


  


}
