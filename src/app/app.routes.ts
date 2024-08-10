import { Routes } from '@angular/router';
import { CardapioComponent } from './components/entities/cardapio/cardapio.component';
import { ItemConsumoComponent } from './components/entities/item-consumo/item-consumo.component';
import { ItemPedidoComponent } from './components/entities/item-pedido/item-pedido.component';
import { PedidoComponent } from './components/entities/pedido/pedido.component';
import { MesaListComponent } from './components/entities/mesa/mesa-list/mesa-list.component';

export const routes: Routes = [
     { path: 'mesas', component: MesaListComponent },
     { path: 'cardapios', component: CardapioComponent },
     { path: 'itens-consumo', component: ItemConsumoComponent },
     { path: 'itens-pedido', component: ItemPedidoComponent },
     { path: 'pedidos', component: PedidoComponent }
];
