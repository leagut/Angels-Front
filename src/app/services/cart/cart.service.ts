import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];  // Aquí guardamos los productos del carrito
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems); // Creamos un BehaviorSubject para emitir los cambios

  // Método para obtener los productos del carrito
  getItems() {
    return this.cartItemsSubject.asObservable();  // Retornamos un observable para suscribirnos a los cambios
  }

  // Método para agregar un producto al carrito
  addItem(product: any) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);  // Emitimos el nuevo estado del carrito
  }

  // Método para eliminar un producto del carrito
  removeItem(product: any) {
   
  
    // Encontrar el índice del primer producto con el productId coincidente
    const index = this.cartItems.findIndex(item => item.productId === product.productId);
  
    if (index !== -1) {
      // Eliminar solo el primer producto que coincida
      this.cartItems.splice(index, 1);
    }
  
    
    this.cartItemsSubject.next(this.cartItems);
  }
  // Método para obtener el total de productos en el carrito
  getTotalItems() {
    return this.cartItems.length;
  }

  // Método para reiniciar el carrito (vaciarlo)
  reset() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);  // Emitimos el nuevo estado (vacío)
  }

  constructor() { }
}
