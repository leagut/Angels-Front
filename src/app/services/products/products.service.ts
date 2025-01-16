import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get<any>(`${environment.urlHost}products/all`)
  }


  getAllProductsFilter(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  const timestamp = new Date().getTime();
  return this.http.get<any>(`${environment.urlHost}products/allfilter?t=${timestamp}`, { 
    headers,
    observe: 'response'  // Esto nos permitirá ver la respuesta completa
  }).pipe(
    map(response => {
      console.log('Response headers:', response.headers);
      console.log('Response body:', response.body);
      return response.body;
    }),
    catchError(error => {
      console.error('Error completo:', error);
      if (error.error instanceof Object) {
        console.log('Error body:', JSON.stringify(error.error));
      }
      return throwError(() => error);
    })
  );
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
