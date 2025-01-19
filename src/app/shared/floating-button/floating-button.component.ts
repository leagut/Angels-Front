import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent {

  @Input() whatsappNumber: string = '573155149624'; // Número por defecto
  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

}
