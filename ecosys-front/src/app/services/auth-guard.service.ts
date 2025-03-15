import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree {
    return this.authService.usuario.pipe(take(1),map(
      usuario => {
        let isLogado = !!usuario;
        if(isLogado){
          return true;
        }
        return this.router.createUrlTree(['/login'])
      }
    ))
    }
}
