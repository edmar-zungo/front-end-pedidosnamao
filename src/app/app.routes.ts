import { Routes } from '@angular/router';
import { ItemPedidoComponent } from './components/entities/item-pedido/item-pedido.component';
import { MesaListComponent } from './components/entities/mesa/mesa-list/mesa-list.component';
import { CardapioListComponent } from './components/entities/cardapio/cardapio-list/cardapio-list.component';
import { CardapioDetailComponent } from './components/entities/cardapio/cardapio-detail/cardapio-detail.component';
import { ItemConsumoListComponent } from './components/entities/item-consumo/item-consumo-list/item-consumo-list.component';
import { ItemConsumoDetailsComponent } from './components/entities/item-consumo/item-consumo-details/item-consumo-details.component';
import { PedidoListComponent } from './components/entities/pedido/pedido-list/pedido-list.component';

export const routes: Routes = [
     { path: 'mesas', component: MesaListComponent },
     { path: 'cardapios', component: CardapioListComponent },
     { path: 'cardapios/:cardapioId', component: CardapioDetailComponent },
     { path: 'itens-consumo', component: ItemConsumoListComponent },
     { path: 'itens-consumo/:itemConsumoId', component: ItemConsumoDetailsComponent },
     { path: 'itens-pedido', component: ItemPedidoComponent },
     { path: 'pedidos', component: PedidoListComponent }
];
