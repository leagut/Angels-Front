import { Component } from '@angular/core';
import {  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mensajecompra',
  templateUrl: './mensajecompra.component.html',
  styleUrls: ['./mensajecompra.component.css']
})
export class MensajecompraComponent {

  @Input() isVisible: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }

}
