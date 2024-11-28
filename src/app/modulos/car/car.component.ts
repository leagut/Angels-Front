import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnChanges {
  @Output() close = new EventEmitter<void>();
  @Input() showModal: boolean = false;

 
  constructor() {
    console.log('Constructor de CarComponent llamado');
  }

  ngOnInit() {
    console.log('NgOnInit de CarComponent');
    console.log('Estado del modal:', this.showModal);
  }

  ngOnChanges() {
    console.log('NgOnChanges de CarComponent');
    console.log('Estado del modal:', this.showModal);
  }

  closeModal() {
    console.log('Método closeModal en CarComponent llamado');
    this.close.emit();
  }


}