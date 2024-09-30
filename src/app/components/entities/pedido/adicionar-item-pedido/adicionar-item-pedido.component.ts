import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoModel } from '../pedido.model';
import { PedidoService } from '../pedido.service';
import { ItemPedidoListComponent } from '../../item-pedido/item-pedido-list/item-pedido-list.component';
import { ItemConsumoListComponent } from "../../item-consumo/item-consumo-list/item-consumo-list.component";
import { ItemPedidoService } from '../../item-pedido/item-pedido.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MesaModel } from '../../mesa/mesa.model';
import { MesaService } from '../../mesa/mesa.service';

@Component({
  selector: 'app-adicionar-item-pedido',
  standalone: true,
  imports: [ItemPedidoListComponent, ReactiveFormsModule],
  templateUrl: './adicionar-item-pedido.component.html',
  styleUrl: './adicionar-item-pedido.component.css'
})
export class AdicionarItemPedidoComponent implements OnInit{

  pedido: PedidoModel | null = null;
  pedidoForm!: FormGroup;
  mesas: MesaModel[] = [];
  mesa: MesaModel | null = null;

  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  pedidoService = inject(PedidoService);
  itensPedidoService = inject(ItemPedidoService);
  formBuilder = inject(FormBuilder);
  mesaService = inject(MesaService);




  ngOnInit(): void {
    const pedidoId = this.activatedRoute.snapshot.params['pedidoId'];
    this.pedidoService.getOnePedido(pedidoId).subscribe(pedidoResult => {
      this.itensPedidoService.getItensPedido(pedidoResult.id!);
      this.pedido = pedidoResult;
    })

    this.carregaMesas();
    this.criaFormulario();
  }

  criaFormulario() {
    const dataActual = new Date(Date.now());
    this.pedidoForm = this.formBuilder.group({
      id: [],
      mesa: [null],
      deliver: [false]
    });
  }

  carregaMesas(){
    this.mesaService.getMesas();
 }

}
