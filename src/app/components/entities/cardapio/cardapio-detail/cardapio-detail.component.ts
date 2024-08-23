import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardapioService } from '../cardapio.service';
import { CardapioModel } from '../cardapio.model';
import { ItemConsumoListComponent } from '../../item-consumo/item-consumo-list/item-consumo-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoCreateUpdateComponent } from '../../item-consumo/item-consumo-create-update/item-consumo-create-update.component';
import { ItemConsumoService } from '../../item-consumo/item-consumo.service';

@Component({
  selector: 'app-cardapio-detail',
  standalone: true,
  imports: [ItemConsumoListComponent],
  templateUrl: './cardapio-detail.component.html',
  styleUrl: './cardapio-detail.component.css'
})
export class CardapioDetailComponent implements OnInit{

  cardapio: CardapioModel | null = null;

  activatedRoute = inject(ActivatedRoute);
  cardapioService = inject(CardapioService);
  itemConsumoService = inject(ItemConsumoService);

  ngOnInit(): void {
    this.carregaCardapioEItensConsumoCardapio();
  }

  carregaCardapioEItensConsumoCardapio(){
    const cardapioId = this.activatedRoute.snapshot.params['cardapioId'];
    this.cardapioService.getOneCardapio(cardapioId).subscribe(cardapioResult => {
      this.cardapio = cardapioResult;
      this.itemConsumoService.getAllItensConsumoPorCardapio(this.cardapio.id!);
    })
  }

}
