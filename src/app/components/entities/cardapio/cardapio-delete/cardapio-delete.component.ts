import { Component, inject } from '@angular/core';
import { CardapioService } from '../cardapio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardapioModel } from '../cardapio.model';

@Component({
  selector: 'app-cardapio-delete',
  standalone: true,
  imports: [],
  templateUrl: './cardapio-delete.component.html',
  styleUrl: './cardapio-delete.component.css'
})
export class CardapioDeleteComponent {



  activeModal = inject(NgbModal);
  cardapioService = inject(CardapioService);

  cardapio: CardapioModel | null = null;


  ngOnInit(): void {

  }

  cancel() {
    this.activeModal.dismissAll();
  }

  eliminar(cardapioId: string) {
    this.cardapioService.deleteCardapio(cardapioId).subscribe(() => {
      this.cardapioService.getCardapios();
    });

    this.cancel();
  }

}
