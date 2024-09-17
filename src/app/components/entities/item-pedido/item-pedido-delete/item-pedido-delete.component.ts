import { Component, inject } from '@angular/core';
import { ItemPedidoModel } from '../item-pedido.model';
import { ItemPedidoService } from '../item-pedido.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-pedido-delete',
  standalone: true,
  imports: [],
  templateUrl: './item-pedido-delete.component.html',
  styleUrl: './item-pedido-delete.component.css',
})
export class ItemPedidoDeleteComponent {
  itemPedido: ItemPedidoModel | null = null;

  activeModal = inject(NgbModal);
  itemPedidoService = inject(ItemPedidoService);

  cancel() {
    this.activeModal.dismissAll();
  }

  eliminar(itemPedidoId: string) {
    this.itemPedidoService.deleteItemPedido(itemPedidoId).subscribe(() => {
      this.itemPedidoService.getItensPedido();
    });

    this.cancel();
  }
}
