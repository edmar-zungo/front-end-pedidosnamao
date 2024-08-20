import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ItemConsumoModel } from './item-consumo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemConsumoService {
  urlApi = `${environment.apiUrl}/itens-consumo`;
  
  itensConsumo = signal<ItemConsumoModel[]>([]); 

  constructor(private http: HttpClient){}

  getItensConsumo(){
    this.http.get<ItemConsumoModel[]>(this.urlApi).subscribe(itensConsumoResult => {
      this.itensConsumo.set(itensConsumoResult);
    });
  }

  saveItenConsumo(itemConsumo: ItemConsumoModel): Observable<ItemConsumoModel>{
    return this.http.post<ItemConsumoModel>(this.urlApi, itemConsumo, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  getOneItemConsumo(itemConsumoId: string): Observable<ItemConsumoModel>{
    return this.http.get<ItemConsumoModel>(`${this.urlApi}/${itemConsumoId}`);
  }

  updateItemConsumo(itemConsumo: ItemConsumoModel): Observable<ItemConsumoModel>{
    return this.http.put<ItemConsumoModel>(`${this.urlApi}/${itemConsumo.id}`, itemConsumo);
  }

  deleteItemConsumo(itemConsumoId: string): Observable<string>{
   return this.http.delete<string>(`${this.urlApi}/${itemConsumoId}`);
  }
}
