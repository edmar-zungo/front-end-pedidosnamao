import { Component, OnInit, input, signal } from '@angular/core';
import { ItemConsumoService } from '../item-consumo.service';
import { RouterLink } from '@angular/router';
import { CardapioModel } from '../../cardapio/cardapio.model';

@Component({
  selector: 'app-item-consumo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-consumo-list.component.html',
  styleUrl: './item-consumo-list.component.css'
})
export class ItemConsumoListComponent implements OnInit {

  cardapio = input<CardapioModel | null>();

  constructor(public itemConsumoService: ItemConsumoService) { }

  ngOnInit(): void {
    this.getAllItensConsumoPorCardapio();
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

  existeBebida(): boolean {
    const tamanhoFilter = this.itemConsumoService.itensConsumo().filter(x => x.tipoItemConsumo === 'BEBIDA').length;
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

  getAllItensConsumoPorCardapio(){
    alert(this.cardapio()?.id)
    this.itemConsumoService.getAllItensConsumoPorCardapio(this.cardapio()?.id!);
  }
}
