import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';  // Importar Subscription

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() showModal: boolean = false;
  cartItems: any[] = [];
  private cartSubscription: Subscription = new Subscription();  // Para gestionar la suscripción

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getItems().subscribe(items => {
      this.cartItems = items;  // Actualizar la lista de productos cuando cambie
    });
  }

  ngOnChanges() {
    console.log('Estado del modal:', this.showModal);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();  // Limpiar la suscripción
  }

  closeModal() {
    this.close.emit();
  }

  removeProduct(product: any) {
    this.cartService.removeItem(product);
  }
}
