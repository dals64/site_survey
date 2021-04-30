import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Auth/auth.service';


@Injectable({
    providedIn: 'root',
})
export class AfterSignin implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
        import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean |
            import("@angular/router").UrlTree> {
        console.log('test')

        if (this.auth.isloggedin) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

    constructor(private auth: AuthService, private router: Router) {

    }

}