import { Component } from '@angular/core';
import { PedidoModel } from '../pedido.model';
import { ItemPedidoListComponent } from '../../item-pedido/item-pedido-list/item-pedido-list.component';

@Component({
  selector: 'app-pedido-detai',
  standalone: true,
  imports: [ItemPedidoListComponent],
  templateUrl: './pedido-detai.component.html',
  styleUrl: './pedido-detai.component.css'
})
export class PedidoDetaiComponent {

  pedido: PedidoModel | null = null;



}
