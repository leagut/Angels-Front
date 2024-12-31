import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get<any>(`${environment.urlHost}products/all`)
  }

  getAllProductsFilter():Observable<any>{
    return this.http.get<any>(`${environment.urlHost}products/allfilter`)
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${environment.urlHost}products/edit/${product.id}`, product);
  }

  updateProductActive(productId: number, active: boolean): Observable<any> {
    console.log(productId,active);
    
    return this.http.put(`${environment.urlHost}products/edit/active/${productId}`, { active });
  }



  addProduct(product: any): Observable<any> {
    return this.http.post(`${environment.urlHost}products/save`, product);
  }


  getAllProductfaltante(): Observable<string[]> {
    return this.http.get<any>(`${environment.urlHost}productos/low-stock`).pipe(
      map((productos: { nombre: string }[]) => productos.map(p => p.nombre)) // Extrae solo los nombres
    );
  }

  getSalesData(): Observable<{ 
    nombreProducto: string; 
    anio: number; 
    mes: number; 
    cantidadVendida: number; 
  }[]> {
    return this.http.get<{ 
      nombreProducto: string; 
      anio: number; 
      mes: number; 
      cantidadVendida: number; 
    }[]>(`${environment.urlHost}stock/por-mes`);
  }


}
