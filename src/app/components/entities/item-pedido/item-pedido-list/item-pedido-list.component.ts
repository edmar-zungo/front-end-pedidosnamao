import { Component, effect, inject, input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemPedidoCreateUpdateComponent } from '../item-pedido-create-update/item-pedido-create-update.component';
import { ItemConsumoService } from '../../item-consumo/item-consumo.service';
import { PedidoService } from '../../pedido/pedido.service';
import { ItemPedidoService } from '../item-pedido.service';
import { ItemPedidoModel } from '../item-pedido.model';
import { ItemPedidoDeleteComponent } from '../item-pedido-delete/item-pedido-delete.component';
import { PedidoModel } from '../../pedido/pedido.model';

@Component({
  selector: 'app-item-pedido-list',
  standalone: true,
  imports: [],
  templateUrl: './item-pedido-list.component.html',
  styleUrl: './item-pedido-list.component.css'
})
export class ItemPedidoListComponent implements OnInit{

  pedido = input<PedidoModel | null>(null);

  modalService = inject(NgbModal);
  public itemPedidoService = inject(ItemPedidoService);

  constructor(){
    effect(() => {
      alert(this.pedido()?.id)
    })
  }

  ngOnInit(): void {
    this.pedidoList();
  }

  openCreateItemPedidoModel() {
		const modalRef = this.modalService.open(ItemPedidoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.pedido = this.pedido();
	} 

  openUpdateItemPedidoModal(itemPedido: ItemPedidoModel) {
		const modalRef = this.modalService.open(ItemPedidoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.itemPedido = itemPedido;
	}

  openDeleteItemPedidoModal(itemPedido: ItemPedidoModel) {
		const modalRef = this.modalService.open(ItemPedidoDeleteComponent,{ size: 'lg' });
    modalRef.componentInstance.itemPedido = itemPedido;
	}

  pedidoList(){
    this.itemPedidoService.getItensPedido(this.pedido()?.id!);
  }

}
