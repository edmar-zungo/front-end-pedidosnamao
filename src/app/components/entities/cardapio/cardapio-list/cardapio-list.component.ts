import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardapioService } from '../cardapio.service';
import { CardapioCreateUpdateComponent } from '../cardapio-create-update/cardapio-create-update.component';
import { CardapioModel } from '../cardapio.model';
import { CardapioDeleteComponent } from '../cardapio-delete/cardapio-delete.component';

@Component({
  selector: 'app-cardapio-list',
  standalone: true,
  imports: [],
  templateUrl: './cardapio-list.component.html',
  styleUrl: './cardapio-list.component.css'
})
export class CardapioListComponent implements OnInit{
  
  protected modalService = inject(NgbModal);
	constructor(public cardapioService: CardapioService){}

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

  updateCardapio(cardapioId: string){
    this.cardapioService.getOneCardapio(cardapioId).subscribe(cardapioResult => {
      let cardapioToUpdate = cardapioResult;

      this.openUpdateCardapioModal(cardapioToUpdate);
    });
  }

  deleteCardapio(cardapioId: string){
    this.cardapioService.getOneCardapio(cardapioId).subscribe(cardapioResult => {
      let cardapioToDelete = cardapioResult;

      this.openDeleteCardapioModal(cardapioToDelete);
    });
  }
}
