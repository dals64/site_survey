import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = null;

  isloggedin = false;

  constructor() { }

  public setCurrentUser(data) : void{
    this.user = data;
    this.isloggedin = true;
  }

  public getCurrentUser() {
    return this.user;
  }

  public loggedIn() {
    return this.isloggedin;
  }

  public logout() {
    this.isloggedin = false;
    this.user = null;
  }
}
