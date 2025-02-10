import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ItemPedidoModel } from './item-pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemPedidoCreateUpdateComponent } from './item-pedido-create-update/item-pedido-create-update.component';
import { ItemConsumoModel } from '../item-consumo/item-consumo.model';

@Injectable({
  providedIn: 'root',
})
export class ItemPedidoService {
  urlApi = `${environment.apiUrl}/itens-pedido`;
  
  itensPedido = signal<ItemPedidoModel[]>([]); 

  constructor(private http: HttpClient){}

  modalService = inject(NgbModal);

  getItensPedido(pedidoId: string){
    this.http.get<ItemPedidoModel[]>(`${this.urlApi}/by-pedido/${pedidoId}`).subscribe(itensPedidoResult => {
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

  openUpdateItemPedidoModal(itemPedido: ItemPedidoModel) {
		const modalRef = this.modalService.open(ItemPedidoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.itemPedido = itemPedido;
	}

  adicionarItemPedido(itemConsumo: ItemConsumoModel): Observable<ItemPedidoModel>{
    return this.http.post<ItemPedidoModel>(`${this.urlApi}/adicionar-item`, itemConsumo);
  }
}
