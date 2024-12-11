import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  

  private apiUrl = `${environment.urlHost}`;

  constructor(private http:HttpClient) { }

  enviarCompra(compra: any): Observable<any> {
    console.log('Enviando compra:', compra);
    return this.http.post(`${this.apiUrl}pedidos/enviarCorreo`, compra); 
  }

}
