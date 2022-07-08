import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  public signInUserInfo: any;

  constructor(
    private router: Router,
    // private userService: UserService,
    public datepipe: DatePipe
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {

      var _signInUser = JSON.parse(localStorage.getItem('signinuserinfo') || 'null');
      // console.log(_signInUser)

      if (!!_signInUser) {
        this.signInUserInfo = _signInUser;
        // if (state.url == '/admin/users') {
        //   this.router.navigate(['admin']);
        // }
        // let _userInfo = {
        //   id: this.signInUserInfo.id,
        //   last_accessed_at: this.datepipe.transform(new Date(), 'YYYY-MM-dd HH:mm:ss'),//2022-06-06 13:33:05
        // }
        // this.signInUserInfo.last_accessed_at = _userInfo.last_accessed_at;
        // this.lastLoggedIn(_userInfo);
        return true;
      } else {
        this.router.navigate(['signin'], { queryParams: { returnurl: state.url } });
        return false;
      }
    } catch (error) {
      this.router.navigate(['signin'], { queryParams: { returnurl: state.url } });
      return false;
    }
  }
}
