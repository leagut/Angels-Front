import { Component } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginReques } from 'src/app/services/auth/loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginError:string="";

  loginForm= this.formBuilder.group({
    email:['xxx@gmail.com',[Validators.required,Validators.email]],
    password:['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder,private router:Router ,private loginService:LoginService ){}


  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }


  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginReques).subscribe({
        next: (userData) =>{
          console.log(userData);          
        },
        error:(errorData)=>{
          this.LoginError=errorData;
          console.error(errorData);          
        },
        complete:()=>{
          console.info('Login Completo'); 
          this.router.navigateByUrl('/inicio')
          this.loginForm.reset();         
        }
      })  ;
      
      
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos")

    }
  }




}
