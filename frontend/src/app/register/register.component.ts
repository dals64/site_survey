import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private router: Router, private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
  }

  public formData = {
    name: '',
    password: '',
    email: '',
    confirm: ''
  }

  public iserror = false;

  public error = '';

  register(): void {
    this.iserror = false;
    if (this.formData.email === '' || this.formData.password === '' || this.formData.name === '') {
      this.iserror = true;
      this.error = 'Tous les champs de ce formulaire sont requis';
    } else if(this.formData.password !== this.formData.confirm) {
      this.iserror = true;
      this.error =  'Le mot de passe et la confirmation du mot de passe ne correspondent pas';
    } else {
      this.http.post('http://localhost:8000/api/auth/register', this.formData).subscribe(
        data => this.handleData(data),
        error => this.handleError(error)
      )
    }
  }

  handleError(error) {
    this.error = error.error.error
    this.iserror = true;
  }

  handleData(data) {
    this.auth.setCurrentUser(data.user);
    this.router.navigateByUrl('/home')
  }


}
