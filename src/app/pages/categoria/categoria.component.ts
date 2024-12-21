import { Component , ViewChild } from '@angular/core';
import { PedidoServiceService } from 'src/app/services/pedido/pedido-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  numeroFactura: string = ''; // Almacena el número de factura ingresado
  pedido: any = null; // Almacena los datos del pedido
  loading: boolean = false; // Indica si la petición está cargando
  error: string | null = null; // Mensaje de error
  @ViewChild('pedidoForm') pedidoForm?: NgForm;

  constructor(private pedidoService: PedidoServiceService) {}

  buscarPedido(): void {
    if (!this.numeroFactura.trim()) {
      this.error = 'El número de factura no puede estar vacío';
      return;
    }

    this.loading = true;
    this.error = null;

    this.pedidoService.getPedidoPorNumeroFactura(this.numeroFactura).subscribe({
      next: (data) => {
        this.pedido = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al recuperar el pedido: ' + err.message;
        this.loading = false;
      },
    });
    
    
  }

  imprimirPedido(): void {

    console.log("pedi",this.pedido);
    
  
  }




}
