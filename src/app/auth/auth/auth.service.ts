import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

//interface AuthResponseData {
//  kind: string;
//  idToken: string;
//  email: string;
//  refreshToken: string;
//  expiresIn: string;
//  localId: string;
//}


@Injectable({providedIn:'root'})
export class AuthService {

  constructor(private http: Http) { }

  signup(email:string,password:string) {
    return this.http.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-4JcEVUbxuvTZyVi3QOe1FJAUbJVDtEA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
