import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { User } from './user';
import { LoginReques } from './loginRequest';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');
  

  constructor(private http: HttpClient, private route: Router) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") !=null );

    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "" );   

  }

  login(credentials: LoginReques): Observable<string> {
    return this.http.post<User>(`${environment.urlHost}auth/log-in`, credentials).pipe(
      tap((user: User) => {
        sessionStorage.setItem("token", user.jwt); // Almacena el token JWT
        this.currentUserData.next(user.jwt); // Actualiza el valor de currentUserData con el JWT
        this.currentUserLoginOn.next(true); // Marca al usuario como autenticado
        console.log(user);
        this.route.navigateByUrl('users');        
      }),
      map((user: User) => user.jwt), // Extrae el JWT de la respuesta
      catchError(this.handleError) // Maneja cualquier error
    );
  }



  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);  
  }


  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}



