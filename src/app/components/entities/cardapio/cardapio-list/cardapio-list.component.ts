import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardapioService } from '../cardapio.service';
import { CardapioCreateUpdateComponent } from '../cardapio-create-update/cardapio-create-update.component';
import { CardapioModel } from '../cardapio.model';
import { CardapioDeleteComponent } from '../cardapio-delete/cardapio-delete.component';
import { RouterLink } from '@angular/router';
import { ItemConsumoCreateUpdateComponent } from '../../item-consumo/item-consumo-create-update/item-consumo-create-update.component';

@Component({
  selector: 'app-cardapio-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cardapio-list.component.html',
  styleUrl: './cardapio-list.component.css'
})
export class CardapioListComponent implements OnInit {


  imagemCardapioPratos = '../../../../../assets/images/pratos.png';
  imagemCardapioBebidas = '../../../../../assets/images/bebidas.png';
  imagemCardapioUnico = '../../../../../assets/images/unico.png';

  protected modalService = inject(NgbModal);
  constructor(public cardapioService: CardapioService) { }

  ngOnInit(): void {
    this.cardapioService.getCardapios();
  }

  openCreateCardapioModal() {
    const modalRef = this.modalService.open(CardapioCreateUpdateComponent, { size: 'lg' });
  }

  openUpdateCardapioModal(cardapio: CardapioModel) {
    const modalRef = this.modalService.open(CardapioCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.cardapio = cardapio;
  }

  openDeleteCardapioModal(cardapio: CardapioModel) {
    const modalRef = this.modalService.open(CardapioDeleteComponent, { size: 'lg' });
    modalRef.componentInstance.cardapio = cardapio;
  }

  updateCardapio(cardapioId: string) {
    this.cardapioService.getOneCardapio(cardapioId).subscribe(cardapioResult => {
      let cardapioToUpdate = cardapioResult;

      this.openUpdateCardapioModal(cardapioToUpdate);
    });
  }

  deleteCardapio(cardapioId: string) {
    this.cardapioService.getOneCardapio(cardapioId).subscribe(cardapioResult => {
      let cardapioToDelete = cardapioResult;

      this.openDeleteCardapioModal(cardapioToDelete);
    });
  }

  openCreateItemConsumoModel(cadapio: CardapioModel) {
		const modalRef = this.modalService.open(ItemConsumoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.cardapio = cadapio;
	}
}
