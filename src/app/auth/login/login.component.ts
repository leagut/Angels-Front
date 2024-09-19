import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginReques } from 'src/app/services/auth/loginRequest';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string="";
  
  loginForm=this.formBuilder.group({
    email:[''],
    password: [''],
  })

  loginData: LoginReques = {username: "", password: ""};

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.getData(); //Obtener valores del formulario
      this.loginError="";

      this.loginService.login(this.loginData).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          //this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  getData(): void {
    this.loginData.username = this.loginForm.get('email')?.value || "";
    this.loginData.password = this.loginForm.get('password')?.value || "";
  }

}
