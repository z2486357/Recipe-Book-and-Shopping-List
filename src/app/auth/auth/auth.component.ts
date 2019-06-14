import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    if (!form.valid) {
      return;
    }
    if (this.isLoginMode){

    } else {
      
      this.authservice.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          console.log(email);
          console.log(password);
        },
        error => {
          console.log(error)
        }
      )
    }
     
    form.reset(); 

    
  }
}
