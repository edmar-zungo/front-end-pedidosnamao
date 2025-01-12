import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegistrationRequestModel } from './models/registration-request.Model';
import { Observable } from 'rxjs';
import { AuthenticationRequestModel } from './models/authentication-request.model';
import { AuthenticationResponseModel } from './models/authentication-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  urlApi = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient){}

  registrarUsuario(registerForm: RegistrationRequestModel): Observable<string>{
    return this.http.post<string>(`${this.urlApi}/register`, registerForm);
  }

  login(loginForm: AuthenticationRequestModel): Observable<AuthenticationResponseModel>{
    return this.http.post<AuthenticationResponseModel>(`${this.urlApi}/authenticate`, loginForm);
  }
}
