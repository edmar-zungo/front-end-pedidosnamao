import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoCreateUpdateComponent } from '../pedido-create-update/pedido-create-update.component';
import { PedidoService } from '../pedido.service';
import { Estado } from '../../enums/estado.enum';
import { EstadoPedido } from '../../enums/estado-pedido.enum';
import { PedidoModel } from '../pedido.model';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [NgxCurrencyDirective, RouterLink, RouterLinkActive],
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css'
})
export class PedidoListComponent implements OnInit{

  router = inject(Router);
  modalService = inject(NgbModal)

  constructor(public pedidoService: PedidoService){}


  ngOnInit(): void {
    this.pedidoService.getPedidos();
  }

  goToCreateUpdateComponent(){
    this.router.navigate(['/pedidos/new']);
  }


  openCreatePedidoModel() {
		// const modalRef = this.modalService.open(PedidoCreateUpdateComponent, { size: 'lg' });

    this.pedidoService.savePedido().subscribe(pedidoResult => {
      this.router.navigate(['adicionar-item-pedido/', pedidoResult.id]);
    })
   
	}

  fecharPedido(pedido: PedidoModel){
    this.pedidoService.mudarEstadoPedido(pedido).subscribe(() => {
      this.pedidoService.getPedidos();
    })
  }
  

}
