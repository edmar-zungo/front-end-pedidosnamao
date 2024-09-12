import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ItemPedidoModel } from './item-pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemPedidoService {
  urlApi = `${environment.apiUrl}/itens-pedido`;
  
  itensPedido = signal<ItemPedidoModel[]>([]); 

  constructor(private http: HttpClient){}

  getItensPedido(){
    this.http.get<ItemPedidoModel[]>(this.urlApi).subscribe(itensPedidoResult => {
      this.itensPedido.set(itensPedidoResult);
    });
  }

  saveItemPedido(itemPedido: ItemPedidoModel): Observable<ItemPedidoModel>{
    return this.http.post<ItemPedidoModel>(this.urlApi, itemPedido);
  }

  getOneItemPedido(itemPedidoId: string): Observable<ItemPedidoModel>{
    return this.http.get<ItemPedidoModel>(`${this.urlApi}/${itemPedidoId}`);
  }

  updateItemPedido(itemPedido: ItemPedidoModel): Observable<ItemPedidoModel>{
    return this.http.put<ItemPedidoModel>(`${this.urlApi}/${itemPedido.id}`, itemPedido);
  }

  deleteItemPedido(itemPedidoId: string): Observable<string>{
   return this.http.delete<string>(`${this.urlApi}/${itemPedidoId}`);
  }
}
