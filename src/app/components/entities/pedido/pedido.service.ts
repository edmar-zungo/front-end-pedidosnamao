import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PedidoModel } from './pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  urlApi = `${environment.apiUrl}/pedidos`;
  
  pedidos = signal<PedidoModel[]>([]); 

  constructor(private http: HttpClient){}

  getPedidos(){
    this.http.get<PedidoModel[]>(this.urlApi).subscribe(pedidosResult => {
      this.pedidos.set(pedidosResult);
    });
  }

  savePedido(pedido: PedidoModel): Observable<PedidoModel>{
    
    return this.http.post<PedidoModel>(this.urlApi, pedido);
  }

  getOnePedido(pedidoId: string): Observable<PedidoModel>{
    return this.http.get<PedidoModel>(`${this.urlApi}/${pedidoId}`);
  }

  updatePedido(pedido: PedidoModel): Observable<PedidoModel>{
    return this.http.put<PedidoModel>(`${this.urlApi}/${pedido.id}`, pedido);
  }

  deletePedido(pedidoId: string): Observable<string>{
   return this.http.delete<string>(`${this.urlApi}/${pedidoId}`);
  }
}
