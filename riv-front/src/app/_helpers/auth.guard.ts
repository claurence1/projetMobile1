import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            console.log(route);
            if(route.routeConfig.path === 'administration') {
                if (currentUser.UserTypeId === 1) {
                    return true;
                } else {
                    this.router.navigate(['/documents']);

                    return false;
                }
            } else {
                return true;
            }

        } else {
        // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        } 


    }
}