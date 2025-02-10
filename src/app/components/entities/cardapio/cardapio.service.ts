import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardapioModel } from './cardapio.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExposeTokenService } from '../../shared/expose-token.service';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {

  urlApi = `${environment.apiUrl}/cardapios`;
  token = localStorage.getItem('token')!;
  cardapios = signal<CardapioModel[]>([]); 

  protected readonly http = inject(HttpClient);
  protected readonly exposeTokenService = inject(ExposeTokenService);


  getCardapios(){
    this.http.get<CardapioModel[]>(this.urlApi).subscribe(cardapiosResult => {
      this.cardapios.set(cardapiosResult);
    });
  }

  saveCardapio(cardapio: CardapioModel): Observable<CardapioModel>{
    return this.http.post<CardapioModel>(this.urlApi, cardapio);
  }

  getOneCardapio(cardapioId: string): Observable<CardapioModel>{
    return this.http.get<CardapioModel>(`${this.urlApi}/${cardapioId}`);
  }

  updateCardapio(cardapio: CardapioModel): Observable<CardapioModel>{
    return this.http.put<CardapioModel>(`${this.urlApi}/${cardapio.id}`, cardapio);
  }

  deleteCardapio(cardapioId: string): Observable<string>{
   return this.http.delete<string>(`${this.urlApi}/${cardapioId}`);
  }
}
