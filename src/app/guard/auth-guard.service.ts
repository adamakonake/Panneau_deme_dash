import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private adminService : AdminService, private router: Router) { }

  canActivate(): boolean {
    let isAdminLoggedIn = this.adminService.isLogin

    if (!isAdminLoggedIn) {
      this.router.navigate(['']);
    }

    return isAdminLoggedIn;
  }
}
