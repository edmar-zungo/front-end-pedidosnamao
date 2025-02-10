import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExposeTokenService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
