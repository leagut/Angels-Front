import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() showModal: boolean = false;
  cartItems: any[] = [];
  totalSuma: number = 0;
  direccion: string = ''; // Propiedad para la dirección
  telefono: string = '';  // Propiedad para el teléfono

  

  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Nos suscribimos al carrito para recibir actualizaciones en tiempo real
    this.cartSubscription = this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.actualizarSuma();
    });
    
  }

  ngOnChanges() {
    console.log('Estado del modal:', this.showModal);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  closeModal() {
    this.close.emit();
  }

  // Método para eliminar un producto del carrito
  removeProduct(product: any) {
    this.cartService.removeItem(product);  // Llamamos al servicio para eliminar el producto
    this.actualizarSuma();
  }

  actualizarSuma(): void {
    this.totalSuma = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  generarNumeroFactura(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
  
    // Generar una cadena alfanumérica aleatoria de 5 caracteres
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
  
    // Combinación de fecha, hora y cadena aleatoria
    return `F${año}${mes}${dia}-${hora}${minutos}-${randomString}`;
  }

  realizarCompra(): void {
    const numeroFactura = this.generarNumeroFactura();

    const compra = {
      numeroFactura,
      direccion: this.direccion,
      telefono: this.telefono,
      total: this.totalSuma,
      preventas: this.cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price
      }))
    };

    console.log('JSON para el backend:', compra);

  }

  camposValidos(): boolean {
    return this.direccion.trim().length > 0 && this.telefono.trim().length > 0;
  }

  permitirSoloNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

}
