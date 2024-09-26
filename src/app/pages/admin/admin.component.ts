import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {

  cargo: string | null = null;
  name: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.cargo = sessionStorage.getItem('rol');
    this.name = sessionStorage.getItem('username');  
  }
}