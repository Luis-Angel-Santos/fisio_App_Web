import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.sesionActive()
      .pipe(map(user => {
        if(!user){
          Swal.fire({
            icon: 'warning',
            title: 'Acceso Denegado',
            text: 'No tiene acceso. Por favor inicie sesión',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          this.router.navigate(['login']);
          return false;
        }else{
          return true;
        }
      }))
  }
  
}
