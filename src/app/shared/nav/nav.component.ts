import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  userLoginOn:boolean=false;
  currentUrl: string = '';
  constructor(private loginService:LoginService,private router: Router) { }


  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentUrl = event.url;
    });



  }

  isCurrentRoute(route: string): boolean {
    return this.currentUrl === route;
  }

 
  logout() {
    // Borrar los elementos del sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol'); // Asumiendo que cargo es el rol
    sessionStorage.removeItem('username');
    this.userLoginOn= false; 
    // Si quieres redirigir después de cerrar sesión
  
  }







}
