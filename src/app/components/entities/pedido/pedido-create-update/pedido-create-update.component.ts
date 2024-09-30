import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoModel } from '../pedido.model';
import { EstadoPedido } from '../../enums/estado-pedido.enum';
import { MesaModel } from '../../mesa/mesa.model';
import { MesaService } from '../../mesa/mesa.service';
import { Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../pedido.service';
import { ItemPedidoListComponent } from '../../item-pedido/item-pedido-list/item-pedido-list.component';
import { PedidoDetaiComponent } from '../pedido-detai/pedido-detai.component';

@Component({
  selector: 'app-pedido-create-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCurrencyDirective, ItemPedidoListComponent],
  templateUrl: './pedido-create-update.component.html',
  styleUrl: './pedido-create-update.component.css'
})
export class PedidoCreateUpdateComponent implements OnInit{
 
  pedidoForm!: FormGroup;
  pedido: PedidoModel | null = null;
  estadoPedido = Object.keys(EstadoPedido);
  mesas: MesaModel[] = [];

  mesa: MesaModel | null = null;

  router = inject(Router);
  pedidoService = inject(PedidoService);
  formBuilder = inject(FormBuilder);
  activeModal = inject(NgbModal);
  modalService = inject(NgbModal);

  constructor(public mesaService: MesaService){}

  ngOnInit(): void {
    this.carregaMesas();
    this.criaFormulario();
  }

  criaFormulario() {
    const dataActual = new Date(Date.now());
    this.pedidoForm = this.formBuilder.group({
      id: [],
      dataCriacao: [dataActual.toISOString().slice(0, 16)],
      sequencia: [null],
      numero: [null],
      dataActualizacao: [dataActual.toISOString().slice(0, 16)],
      mesa: [null],
      estadoPedido: [EstadoPedido.PENDENTE],
      descricao: [""],
      deliver: [false],
      enderecoEntregaDetalhado: [null],
      tempoEntrega: [null],
      descricaoEntrega: [""],
      valorEntrega: [0, [Validators.required]],
      totalPagar: [0, [Validators.required]],
      totalPago: [0, [Validators.required]],
      totalTroco: [0, [Validators.required]]
    });
  }

  carregaMesas(){
     this.mesaService.getMesas();
  }

  cancel() {
    this.activeModal.dismissAll();
  }


  onSave() {
  //  this.pedido = this.pedidoForm.value;
  //    if (this.pedido?.id != null) {
  //      this.pedidoService.updatePedido(this.pedido).subscribe(() => {
  //        this.pedidoService.getPedidos();
  //        this.cancel();
  //      });

  //    } else {
  //      this.pedidoService.savePedido(this.pedido!).subscribe(pedidoResult => {
  //       this.pedidoService.getPedidos();
  //        this.cancel();
  //       this.router.navigate(['pedidos/detail']);
  //      });
  //    }
  }

  openCreateItemPedidoModel(pedido: PedidoModel) {
		const modalRef = this.modalService.open(PedidoDetaiComponent, { size: 'lg' });
    modalRef.componentInstance.pedido = pedido;
	} 

  save(){
    this.pedidoService.savePedido().subscribe(pedidoResult => {
      this.router.navigate(['/adicionar-item-pedido', pedidoResult.id]);
      this.pedidoService.getPedidos();
       this.cancel();
      
     });
  }

}
