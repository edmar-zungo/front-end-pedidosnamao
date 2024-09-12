import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemPedidoCreateUpdateComponent } from '../item-pedido-create-update/item-pedido-create-update.component';

@Component({
  selector: 'app-item-pedido-list',
  standalone: true,
  imports: [],
  templateUrl: './item-pedido-list.component.html',
  styleUrl: './item-pedido-list.component.css'
})
export class ItemPedidoListComponent implements OnInit{


  modalService = inject(NgbModal);

  ngOnInit(): void {
    
  }

  openCreateItemPedidoModel() {
		const modalRef = this.modalService.open(ItemPedidoCreateUpdateComponent, { size: 'lg' });
    
	} 

}
