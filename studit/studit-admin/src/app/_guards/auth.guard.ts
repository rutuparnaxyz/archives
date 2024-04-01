import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 /**
  *
  */
 constructor(
   private _auth: AuthService,
   private _router: Router,
   private toastr: ToastrService) {
  
   
 }




canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  const token = localStorage.getItem('token');
  if (token != null) {
    console.log(token);
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(token)) {
      this._router.navigate(['/login']);
      // this.toastr.error("Session Expired! Please Login Again")

      return false;
    } else {
      return true;
    }
  } else {
    // this.toastr.error("Please Login to continue");
    this._router.navigate(['/login']);
    return false;
  }

}
}
