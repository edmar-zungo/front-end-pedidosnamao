import { Component, OnInit, effect, inject, input, signal } from '@angular/core';
import { ItemConsumoService } from '../item-consumo.service';
import { RouterLink } from '@angular/router';
import { CardapioModel } from '../../cardapio/cardapio.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoCreateUpdateComponent } from '../item-consumo-create-update/item-consumo-create-update.component';
import { ItemConsumoDetailsComponent } from '../item-consumo-details/item-consumo-details.component';
import { ItemConsumoModel } from '../item-consumo.model';

@Component({
  selector: 'app-item-consumo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-consumo-list.component.html',
  styleUrl: './item-consumo-list.component.css'
})
export class ItemConsumoListComponent implements OnInit {

  cardapio = input<CardapioModel | null>();

  modalService = inject(NgbModal)

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

  // existeBebida(): boolean {
  //   const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoItemConsumo === 'BEBIDA').length;
  //   if (tamanhoFilter === 0) {
  //     return false;
  //   }
  //   return true;
  // }
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

}
