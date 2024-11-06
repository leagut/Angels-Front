import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  name: string | null = null;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('username');
  }

  


}
