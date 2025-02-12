import { Component, OnInit, TemplateRef, ViewEncapsulation, effect, inject, input, signal } from '@angular/core';
import { ItemConsumoService } from '../item-consumo.service';
import { RouterLink } from '@angular/router';
import { CardapioModel } from '../../cardapio/cardapio.model';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoCreateUpdateComponent } from '../item-consumo-create-update/item-consumo-create-update.component';
import { ItemConsumoDetailsComponent } from '../item-consumo-details/item-consumo-details.component';
import { ItemConsumoModel } from '../item-consumo.model';
import { ItemPedidoService } from '../../item-pedido/item-pedido.service';
import { PedidoService } from '../../pedido/pedido.service';
import { ItemPedidoModel } from '../../item-pedido/item-pedido.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-consumo-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './item-consumo-list.component.html',
  styleUrl: './item-consumo-list.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ItemConsumoListComponent implements OnInit {

  cardapio = input<CardapioModel | null>();

  modalService = inject(NgbModal);
  itemPedidoService = inject(ItemPedidoService);
  pedidoService = inject(PedidoService);
  offcanvasService = inject(NgbOffcanvas);

  constructor(public itemConsumoService: ItemConsumoService) {
   
   }

  ngOnInit(): void {
   
  }

  existeItens(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }
  existePratosPrincipais(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoPrato === 'PRINCIPAL').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }
  existePratosEntrada(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoPrato === 'ENTRADA').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }
  existePratosSobremesa(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoPrato === 'SOBRE_MESA').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }

  existeBebidaAlcoolica(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoBebida === 'ALCOOLICA').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }
  existeBebidaNaoAlcoolica(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoBebida === 'NAO_ALCOOLICA').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }
  cardapioUnico(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoItemConsumo === 'BEBIDA' && x.cardapio?.tipoCardapio === 'UNICO').length;
    if (tamanhoFilter === 0) {
      return false;
    }
    return true;
  }

  openCreateItemConsumoModel() {
		const modalRef = this.modalService.open(ItemConsumoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.cardapio = this.cardapio();
	}

  openDetailItemConsumoModel(itemConsumo: ItemConsumoModel) {
		const modalRef = this.modalService.open(ItemConsumoDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.itemConsumo = itemConsumo;
    
	}

  adicionarItem(item: ItemConsumoModel) {
    this.itemPedidoService.adicionarItemPedido(item).subscribe(resp => {
      this.itemPedidoService.openUpdateItemPedidoModal(resp);
    })
  }

  editeItemPedido(item: ItemPedidoModel){
    this.itemPedidoService.openUpdateItemPedidoModal(item);
  }

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
    this.itemPedidoService.actualizarTotal(this.pedidoService.itemsPedido);
	}

  removeItem(item: any): void {
    const index = this.pedidoService.itemsPedido.indexOf(item);
    if (index > -1) {
      this.pedidoService.itemsPedido.splice(index, 1);
      this.itemPedidoService.actualizarTotal(this.pedidoService.itemsPedido);
    }
  }

  

}
