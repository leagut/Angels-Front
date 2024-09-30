import { Component, OnInit } from '@angular/core';
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

  constructor( private  ProductService : ProductsService  ) { }

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

    throw new Error('Method not implemented.');
  }



  }









