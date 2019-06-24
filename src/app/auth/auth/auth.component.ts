import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode){

    } else {
      
      this.authservice.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          console.log(email);
          console.log(password);
          this.isLoading = false;
        },
        error => {
          console.log(error)
          this.error='An error occured!'
          this.isLoading = false;
        }
      )
    }
     
    form.reset(); 

    
  }
}
