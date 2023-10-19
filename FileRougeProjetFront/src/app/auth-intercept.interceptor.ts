import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';


@Injectable()
export class AuthInterceptInterceptor implements HttpInterceptor {

  constructor(private service:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  console.log(localStorage.getItem('token'));

   request= request.clone({

      headers:request.headers.set('Authorization',`Bearer ${this.service.token}`)
    })
    localStorage.removeItem('token');

    return next.handle(request);
  }
}

export const authInterceptorProvider ={
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptInterceptor,
    multi:true
}