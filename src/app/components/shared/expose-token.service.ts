import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExposeTokenService {

  http = inject(HttpClient);

  exposeToken(): HttpHeaders{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token!}`, // Adiciona o token ao cabeçalho
    });
    
    return headers;
  }

}
