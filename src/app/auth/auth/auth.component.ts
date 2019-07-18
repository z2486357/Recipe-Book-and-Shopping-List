import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    let authObs:Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode){
      authObs=this.authservice.login(email,password);
    } else {
      
      authObs=this.authservice.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error=errorMessage;
        this.isLoading = false;
      }
    )
    form.reset(); 

    
  }
}
