import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../pedido.service';
import { PedidoModel } from '../pedido.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [NgxCurrencyDirective, RouterLink, RouterLinkActive, NgxPaginationModule],
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css'
})
export class PedidoListComponent implements OnInit{

  router = inject(Router);
  modalService = inject(NgbModal)

  pageNumber = 1;
  pageItens = 5;

  constructor(public pedidoService: PedidoService){}


  ngOnInit(): void {
    this.pedidoService.getPedidos(this.pageNumber, this.pageItens);
  }

  // createPedido() {
  //   this.pedidoService.savePedido().subscribe(pedidoResult => {
  //     this.router.navigate(['adicionar-item-pedido/', pedidoResult.id]);
  //   })
   
	// }

  fecharPedido(pedido: PedidoModel){
    this.pedidoService.mudarEstadoPedido(pedido).subscribe(() => {
      this.pedidoService.getPedidos(this.pageNumber, this.pageItens);
    })
  }

  pageChanged(event: number){
    this.pageNumber = event;
    this.pedidoService.getPedidos(this.pageNumber, this.pageItens);

  }
  

}
