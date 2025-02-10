import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PedidoModel } from './pedido.model';
import { PedidoPageModel } from './pedido-page.model';
import { Router } from '@angular/router';
import { ItemPedidoModel } from '../item-pedido/item-pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  urlApi = `${environment.apiUrl}/pedidos`;
  
  pedidos = signal<PedidoPageModel | null>(null);
  pedidoRead = signal<PedidoModel | null>(null);

  itemsPedido: ItemPedidoModel[] = [];

  router = inject(Router);

  constructor(private http: HttpClient){}

  getPedidos(pageNumber: number, pageItens: number){
    pageNumber = pageNumber - 1;
    this.http.get<PedidoPageModel>(this.urlApi, {params: {pageNumber, pageItens}}).subscribe(pedidosResult => {
      this.pedidos.set(pedidosResult);
    });
  }

  savePedido(pedido: PedidoModel): Observable<PedidoModel>{
    
    return this.http.post<PedidoModel>(this.urlApi, pedido);
  }

  getOnePedido(pedidoId: string): Observable<PedidoModel>{
    return this.http.get<PedidoModel>(`${this.urlApi}/${pedidoId}`);
  }

  calcularTotalPedido(pedidoId: string): void{
     this.http.get<PedidoModel>(`${this.urlApi}/calculaTotalPagar/${pedidoId}`).subscribe(pedidoResult => {
      this.pedidoRead.set(pedidoResult);
     });
  }

  mudarEstadoPedido(pedido: PedidoModel): Observable<PedidoModel>{
    return this.http.put<PedidoModel>(`${this.urlApi}/mudar-estado`, pedido);
  }

  updatePedido(pedido: PedidoModel): Observable<PedidoModel>{
    return this.http.put<PedidoModel>(`${this.urlApi}/${pedido.id}`, pedido);
  }

  deletePedido(pedidoId: string): Observable<string>{
   return this.http.delete<string>(`${this.urlApi}/${pedidoId}`);
  }

  // createPedido() {
  //   this.savePedido().subscribe(pedidoResult => {
  //     this.router.navigate(['adicionar-item-pedido/', pedidoResult.id]);
  //   })
   
	// }
}
