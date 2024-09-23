import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoModel } from '../pedido.model';
import { PedidoService } from '../pedido.service';
import { ItemPedidoListComponent } from '../../item-pedido/item-pedido-list/item-pedido-list.component';
import { ItemConsumoListComponent } from "../../item-consumo/item-consumo-list/item-consumo-list.component";
import { ItemPedidoService } from '../../item-pedido/item-pedido.service';

@Component({
  selector: 'app-adicionar-item-pedido',
  standalone: true,
  imports: [ItemPedidoListComponent],
  templateUrl: './adicionar-item-pedido.component.html',
  styleUrl: './adicionar-item-pedido.component.css'
})
export class AdicionarItemPedidoComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  pedidoService = inject(PedidoService);
  itensPedidoService = inject(ItemPedidoService);

  pedido: PedidoModel | null = null;


  ngOnInit(): void {
    const pedidoId = this.activatedRoute.snapshot.params['pedidoId'];
    this.pedidoService.getOnePedido(pedidoId).subscribe(pedidoResult => {
      this.itensPedidoService.getItensPedido(pedidoResult.id!);
      this.pedido = pedidoResult;
    })
  }

}
