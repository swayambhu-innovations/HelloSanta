import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService,private router: Router,private dataProvider: DataProvider){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isJustLoggedIn){
      if(!this.authService.isEmailVerified && !this.authService.isNumberVerified){
        alert('Your email or phone number is not verified');
        this.router.navigate(['/verifyEmail'])
        return false
      }
      return true;
    }
    this.dataProvider.redirectURL = window.location.pathname;
    this.router.navigate(['/login'])
    return false;
  }
}
