import { Component, inject, OnInit } from '@angular/core';
import { PedidoService } from '../../pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [],
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css'
})
export class PedidoListComponent implements OnInit{

  router = inject(Router);

  constructor(public pedidoService: PedidoService){}


  ngOnInit(): void {
    this.pedidoService.getPedidos();
  }

  goToCreateUpdateComponent(){
    this.router.navigate(['/pedidos/new']);
  }

  

}
