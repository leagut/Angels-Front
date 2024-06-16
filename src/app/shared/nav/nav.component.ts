import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit , OnDestroy {

  userLoginOn:boolean=false;

  constructor(private loginService: LoginService){}
  ngOnDestroy(): void {
    this.loginService.currentUserLogin.unsubscribe();
  }


  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  
  

}
