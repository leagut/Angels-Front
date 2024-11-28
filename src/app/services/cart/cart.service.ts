import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // Importar BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = []; // Arreglo de productos en el carrito
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems); // BehaviorSubject

  getItems() {
    return this.cartItemsSubject.asObservable(); // Retorna el observable
  }

  addItem(product: any) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);  // Emitir el nuevo estado
  }

  reset() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);  // Emitir el nuevo estado
  }

  getTotalItems() {
    return this.cartItems.length;
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItemsSubject.next(this.cartItems);  // Emitir el nuevo estado
  }

  constructor() { }
}
