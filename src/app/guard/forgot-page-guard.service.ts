import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPageGuardService implements CanActivate {

  constructor(private adminService : AdminService, private router: Router) { }

  canActivate(): boolean {
    let isAdminLoggedIn = this.adminService.codeSend;

    if (!isAdminLoggedIn) {
      this.router.navigate(['forgot-page']);
    }

    return isAdminLoggedIn;
  }
}
