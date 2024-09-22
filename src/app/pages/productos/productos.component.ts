import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private  ProductService : ProductsService  ){}

  productsData:Array<any>=[];
  searchText: string = ''; 


  ngOnInit(): void {

    this.ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsData = res;
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    throw new Error('Method not implemented.');
  }


  


}
