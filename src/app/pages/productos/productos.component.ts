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
        this.productsData = res;
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  //  throw new Error('Method not implemented.');
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
    console.log('Producto agregado al carrito:', product);
  }


  


}
