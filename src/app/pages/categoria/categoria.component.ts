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
  confirmacionVenta: boolean = false;
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
    if (this.confirmacionVenta) {
      // Verifica si `pedido` tiene contenido válido
      if (!this.pedido) {
        this.error = 'No se ha cargado ningún pedido para confirmar la venta.';
        return;
      }
  
      console.log('Confirmando la venta...');
  
      this.pedidoService.confirmarCompraEfectivo(this.pedido).subscribe({
        next: (response) => {
          console.log('Venta confirmada:', response);
          alert('Venta confirmada exitosamente');
          this.pedido = null; // Limpia el pedido tras confirmarlo
        },
        error: (err) => {
          console.error('Error al confirmar la venta:', err);
  
          if (err.status === 400) {
            this.error = 'La factura ya ha sido gestionada previamente.';
            this.pedido = null; 
            
          } else if (err.status === 500 && err.error?.error?.includes('UK')) {
            this.error = 'La factura ya ha sido gestionada previamente.';
            this.pedido = null; 
            
          } else {
            this.error = 'Ocurrió un error al confirmar la venta. Por favor, intente nuevamente.';
            alert(this.error);
          }
        },
      });
    } else {
      this.error = 'Debe confirmar la venta marcando la casilla correspondiente.';
      alert(this.error);
    }
  }
















}
