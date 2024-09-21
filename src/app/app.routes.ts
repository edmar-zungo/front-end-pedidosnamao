import { Routes } from '@angular/router';
import { MesaListComponent } from './components/entities/mesa/mesa-list/mesa-list.component';
import { CardapioListComponent } from './components/entities/cardapio/cardapio-list/cardapio-list.component';
import { CardapioDetailComponent } from './components/entities/cardapio/cardapio-detail/cardapio-detail.component';
import { ItemConsumoListComponent } from './components/entities/item-consumo/item-consumo-list/item-consumo-list.component';
import { ItemConsumoDetailsComponent } from './components/entities/item-consumo/item-consumo-details/item-consumo-details.component';
import { PedidoListComponent } from './components/entities/pedido/pedido-list/pedido-list.component';
import { PedidoCreateUpdateComponent } from './components/entities/pedido/pedido-create-update/pedido-create-update.component';
import { ItemPedidoListComponent } from './components/entities/item-pedido/item-pedido-list/item-pedido-list.component';
import { PedidoDetaiComponent } from './components/entities/pedido/pedido-detai/pedido-detai.component';
import { AdicionarItemPedidoComponent } from './components/entities/pedido/adicionar-item-pedido/adicionar-item-pedido.component';

export const routes: Routes = [
     { path: 'mesas', component: MesaListComponent },
     { path: 'cardapios', component: CardapioListComponent },
     { path: 'cardapios/:cardapioId', component: CardapioDetailComponent },
     { path: 'itens-consumo', component: ItemConsumoListComponent },
     { path: 'itens-consumo/:itemConsumoId', component: ItemConsumoDetailsComponent },
     { path: 'itens-pedido', component: ItemPedidoListComponent },
     { path: 'pedidos', component: PedidoListComponent },
     { path: 'pedidos/new', component: PedidoCreateUpdateComponent },
     { path: 'pedidos/detail', component: PedidoDetaiComponent },
     { path: 'adicionar-item-pedido/:pedidoId', component: AdicionarItemPedidoComponent }
];
