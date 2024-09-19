import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: string = "";

  constructor() {}

  getToken(): void {
    this.token = sessionStorage.getItem("token") || "";
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.getToken();
    if(this.token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      })

      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
