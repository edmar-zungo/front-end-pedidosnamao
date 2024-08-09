import { Routes } from '@angular/router';
import { MesaComponent } from './components/entities/mesa/mesa.component';
import { CardapioComponent } from './components/entities/cardapio/cardapio.component';
import { ItemConsumoComponent } from './components/entities/item-consumo/item-consumo.component';
import { ItemPedidoComponent } from './components/entities/item-pedido/item-pedido.component';
import { PedidoComponent } from './components/entities/pedido/pedido.component';

export const routes: Routes = [
     { path: 'mesa', component: MesaComponent },
     { path: 'cardapio', component: CardapioComponent },
     { path: 'item-consumo', component: ItemConsumoComponent },
     { path: 'item-pedido', component: ItemPedidoComponent },
     { path: 'pedido', component: PedidoComponent }
];
