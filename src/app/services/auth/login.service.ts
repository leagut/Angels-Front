import { Injectable } from '@angular/core';
import { LoginReques } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogin: BehaviorSubject<boolean> = new  BehaviorSubject<boolean>(false);
  currentUserData:  BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});


  constructor(private http : HttpClient) { }


  login(credentials:LoginReques):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData:User)=>{
        this.currentUserData.next(userData);
        this.currentUserLogin.next(true);
      }),


      catchError(this.handleError)
    )
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Manejar error de red
      console.error('Error de red', error.error);
    } else {
      
      console.error('Error de servidor', error.status, error.error);
    }
      return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
    }



  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  } 

  get userLogin():Observable<boolean>{
    return this.currentUserLogin.asObservable();
  }


}





