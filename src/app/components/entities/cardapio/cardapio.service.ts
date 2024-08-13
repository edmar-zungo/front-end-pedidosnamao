import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardapioModel } from './cardapio.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardapioService {

  urlApi = `${environment.apiUrl}/cardapios`;
  
  cardapios = signal<CardapioModel[]>([]); 

  constructor(private http: HttpClient){}

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
