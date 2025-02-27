import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {

  
  constructor(private http: HttpClient) {}
  

  getPedidoPorNumeroFactura(numeroFactura: string): Observable<any> {
    return this.http.get<any>(`${environment.urlHost}recupero/factura/${numeroFactura}`);
  }

  
  confirmarCompraEfectivo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}compraconfirm/efectivo`, data);
  }
  


}
