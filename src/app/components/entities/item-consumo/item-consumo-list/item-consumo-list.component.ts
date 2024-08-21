import { Component, OnInit } from '@angular/core';
import { ItemConsumoService } from '../item-consumo.service';
import { TipoItemConsumo } from '../../enums/tipo-item-consumo.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-consumo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-consumo-list.component.html',
  styleUrl: './item-consumo-list.component.css'
})
export class ItemConsumoListComponent implements OnInit{

  tipoItemConsumo = Object.keys(TipoItemConsumo);
 
  constructor(public itemConsumoService: ItemConsumoService){}

  ngOnInit(): void {
    this.itemConsumoService.getItensConsumo();
  }

}
