import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.usuario.pipe(
          take(1),
          exhaustMap(
            usuario => {
              if(!usuario){
                return next.handle(req)
              }
              
              const req_com_token = req.clone({headers: new HttpHeaders().set('x-access-token',usuario.token)})
                       
              return next.handle(req_com_token)
            }
          )
        )
  }
}
