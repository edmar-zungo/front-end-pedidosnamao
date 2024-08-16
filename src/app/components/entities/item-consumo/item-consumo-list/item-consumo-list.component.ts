import { Component, OnInit } from '@angular/core';
import { ItemConsumoService } from '../item-consumo.service';

@Component({
  selector: 'app-item-consumo-list',
  standalone: true,
  imports: [],
  templateUrl: './item-consumo-list.component.html',
  styleUrl: './item-consumo-list.component.css'
})
export class ItemConsumoListComponent implements OnInit{

  constructor(public itemConsumoService: ItemConsumoService){}

  ngOnInit(): void {
    this.itemConsumoService.getItensConsumo();
  }

}
