import { Routes } from '@angular/router';
import { ItemConsumoComponent } from './components/entities/item-consumo/item-consumo.component';
import { ItemPedidoComponent } from './components/entities/item-pedido/item-pedido.component';
import { PedidoComponent } from './components/entities/pedido/pedido.component';
import { MesaListComponent } from './components/entities/mesa/mesa-list/mesa-list.component';
import { CardapioListComponent } from './components/entities/cardapio/cardapio-list/cardapio-list.component';
import { CardapioDetailComponent } from './components/entities/cardapio/cardapio-detail/cardapio-detail.component';

export const routes: Routes = [
     { path: 'mesas', component: MesaListComponent },
     { path: 'cardapios', component: CardapioListComponent },
     { path: 'cardapios/:cardapioId', component: CardapioDetailComponent },
     { path: 'itens-consumo', component: ItemConsumoComponent },
     { path: 'itens-pedido', component: ItemPedidoComponent },
     { path: 'pedidos', component: PedidoComponent }
];
