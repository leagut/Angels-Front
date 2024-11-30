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
}
