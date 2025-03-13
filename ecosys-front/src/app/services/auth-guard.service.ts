import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  // constructor(private authService: AuthService, private router: Router) { }
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean{
    return this.authService.isAutenticado()
        .then(
            (isAutenticado: boolean) => {
                if(isAutenticado) {
                  return true;
                }else{
                  this.router.navigate(['/login'])
                }
                return false;
            }
        )
    }
}
