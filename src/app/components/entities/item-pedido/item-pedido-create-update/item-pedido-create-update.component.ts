import { Component, inject, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemConsumoModel } from '../../item-consumo/item-consumo.model';
import { PedidoModel } from '../../pedido/pedido.model';
import { Router } from '@angular/router';
import { ItemPedidoService } from '../item-pedido.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoService } from '../../item-consumo/item-consumo.service';
import { PedidoService } from '../../pedido/pedido.service';
import { ItemPedidoModel } from '../item-pedido.model';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-item-pedido-create-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCurrencyDirective],
  providers: [NgModule],
  templateUrl: './item-pedido-create-update.component.html',
  styleUrl: './item-pedido-create-update.component.css',
})
export class ItemPedidoCreateUpdateComponent implements OnInit {
  itemPedidoForm!: FormGroup;
  itensConsumo: ItemConsumoModel[] = [];
  pedidos: PedidoModel[] = [];

  itemPedido: ItemPedidoModel | null = null;

  pedido: PedidoModel | null = null;

  pageNumber = 1;
  pageItens = 5;
  

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  activeModal = inject(NgbModal);
  itemPedidoService = inject(ItemPedidoService);
  public itemCosnumoService = inject(ItemConsumoService);
  public pedidoService = inject(PedidoService);

  ngOnInit(): void {

    this.careegarRelacionamentos();
    this.criarFormulario();

    if(this.itemPedido != null){
      this.preencheFormularioActualizacao(this.itemPedido);
    }
  }

  careegarRelacionamentos() {
    this.itemCosnumoService.getItensConsumo();
    this.pedidoService.getPedidos(this.pageNumber, this.pageItens);
  }

  criarFormulario() {
    this.itemPedidoForm = this.formBuilder.group({
      id: [],
      itemConsumo: [null, [Validators.required]],
      quantidadeItemConsumo: [1, [Validators.required]],
      precoItemPedido: [0, [Validators.required]],
      desconto: [0],
      descricao: [''],
      pedido: [this.pedido, [Validators.required]],
    });
  }

  preencheFormularioActualizacao(itemPedido: ItemPedidoModel) {
    this.itemPedidoForm.patchValue({
      id: itemPedido.id,
      itemConsumo: itemPedido.itemConsumo,
      quantidadeItemConsumo: itemPedido.quantidadeItemConsumo,
      precoItemPedido: itemPedido.precoItemPedido,
      desconto: itemPedido.desconto,
      descricao: itemPedido.descricao,
      pedido: itemPedido.pedido
    })
  }

  cancel() {
    this.activeModal.dismissAll();
  }

  onSave() {

    var itemResult = this.pedidoService.itemsPedido.find(x => x.itemConsumo?.id === this.itemPedido?.itemConsumo?.id);
    if(itemResult){
      itemResult.quantidadeItemConsumo = this.itemPedido?.quantidadeItemConsumo!
      itemResult.precoItemPedido = this.itemPedido?.precoItemPedido!

     } else{
       this.pedidoService.itemsPedido.push( this.itemPedidoForm.value );
     }

     this.itemPedidoService.actualizarTotal(this.pedidoService.itemsPedido);

    
     this.cancel();
  }

  calcularPreco(){
    const precoItemConsumo = this.itemPedidoForm.get(['itemConsumo'])?.value.preco;
    const qtd = this.itemPedidoForm.get(['quantidadeItemConsumo'])?.value;
    const novoPreco = precoItemConsumo * qtd;

    this.itemPedidoForm.patchValue({
      precoItemPedido: novoPreco
    })
  }


}
