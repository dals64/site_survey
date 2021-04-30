import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  opened = false;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }

  public user = {
    email: '',
    name: ''
  };

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
  }

  logout() {
    this.http.get('http://localhost:8000/api/auth/logout');
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
