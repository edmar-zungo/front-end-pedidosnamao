import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoCreateUpdateComponent } from '../pedido-create-update/pedido-create-update.component';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [NgxCurrencyDirective],
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
		const modalRef = this.modalService.open(PedidoCreateUpdateComponent, { size: 'lg' });
   
	} 
  

}
