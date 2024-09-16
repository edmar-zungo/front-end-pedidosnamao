import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemPedidoCreateUpdateComponent } from '../item-pedido-create-update/item-pedido-create-update.component';
import { ItemConsumoService } from '../../item-consumo/item-consumo.service';
import { PedidoService } from '../../pedido/pedido.service';
import { ItemPedidoService } from '../item-pedido.service';

@Component({
  selector: 'app-item-pedido-list',
  standalone: true,
  imports: [],
  templateUrl: './item-pedido-list.component.html',
  styleUrl: './item-pedido-list.component.css'
})
export class ItemPedidoListComponent implements OnInit{


  modalService = inject(NgbModal);
  public itemPedidoService = inject(ItemPedidoService);

  ngOnInit(): void {
    this.itemPedidoService.getItensPedido();
  }

  openCreateItemPedidoModel() {
		const modalRef = this.modalService.open(ItemPedidoCreateUpdateComponent, { size: 'lg' });
    
	} 

}
