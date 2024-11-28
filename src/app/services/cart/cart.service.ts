import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = []; // Aquí puedes definir el tipo según tu modelo de productos

  getItems() {
    return this.cartItems;
  }

  addItem(product: any) {
    this.cartItems.push(product);
  }

  reset() {
    this.cartItems = [];
  }

  getTotalItems() {
    return this.cartItems.length;
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  constructor() { }
}
