import { Injectable, input, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegistrationRequestModel } from './models/registration-request.Model';
import { Observable } from 'rxjs';
import { AuthenticationRequestModel } from './models/authentication-request.model';
import { AuthenticationResponseModel } from './models/authentication-response.model';
import { RegistrationResponseModel } from './models/registration-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  urlApi = `${environment.apiUrl}/auth`;
  Accountlogin = signal<boolean>(true);

  constructor(private http: HttpClient){}

  registrarUsuario(registerForm: RegistrationRequestModel): Observable<RegistrationResponseModel>{
    return this.http.post<RegistrationResponseModel>(`${this.urlApi}/register`, registerForm);
  }

  login(loginForm: AuthenticationRequestModel): Observable<AuthenticationResponseModel>{
    return this.http.post<AuthenticationResponseModel>(`${this.urlApi}/authenticate`, loginForm);
  }
}
