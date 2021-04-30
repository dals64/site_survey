import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  public loginData = {
    email:'',
    password:''
  }

  iserror = false;

  error = '';

  ngOnInit(): void {
  }

  public login(){
    this.iserror = false;
    if (this.loginData.email === '' || this.loginData.password === '') {
      this.iserror = true;
      this.error = 'Remplissez votre adresse mail et votre mot de passe.'
    } else {
      this.http.post('http://localhost:8000/api/auth/login', this.loginData).subscribe(
        data => this.handleData(data),
        error => this.handleError(error)
      )
    }
  }

  handleError(error){
    this.iserror = true;
    this.error = error.error.error
  }

  handleData(data){
    this.auth.setCurrentUser(data.user);
    this.router.navigateByUrl('/home')
  }

}
