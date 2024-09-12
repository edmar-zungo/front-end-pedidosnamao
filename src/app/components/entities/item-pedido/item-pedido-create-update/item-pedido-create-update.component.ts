import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-item-pedido-create-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-pedido-create-update.component.html',
  styleUrl: './item-pedido-create-update.component.css',
})
export class ItemPedidoCreateUpdateComponent implements OnInit {
  itemPedidoForm!: FormGroup;
  itensConsumo: ItemConsumoModel[] = [];
  pedidos: PedidoModel[] = [];

  itemPedido: ItemPedidoModel | null = null;

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  activeModal = inject(NgbModal);
  itemPedidoService = inject(ItemPedidoService);
  itemCosnumoService = inject(ItemConsumoService);
  pedidoService = inject(PedidoService);

  ngOnInit(): void {
    this.careegarRelacionamentos();
    this.criarFormulario();
  }

  careegarRelacionamentos() {
    this.itensConsumo = this.itemCosnumoService.itensConsumo();
    this.pedidos = this.pedidoService.pedidos();
  }

  criarFormulario() {
    this.itemPedidoForm = this.formBuilder.group({
      id: [],
      itemConsumo: [null, [Validators.required]],
      quantidadeItemConsumo: [1, [Validators.required]],
      precoItemConsumo: [0, [Validators.required]],
      desconto: [0],
      descricao: [''],
      pedido: [null, [Validators.required]],
    });
  }

  cancel() {
    this.activeModal.dismissAll();
  }

  onSave() {
    this.itemPedido = this.itemPedidoForm.value;
    if (this.itemPedido?.id != null) {
      this.itemPedidoService.updateItemPedido(this.itemPedido).subscribe(() => {
        this.itemPedidoService.getItensPedido();
        this.cancel();
      });
    } else {
      this.itemPedidoService.saveItemPedido(this.itemPedido!).subscribe(() => {
        this.itemPedidoService.getItensPedido();
        this.cancel();
      });
    }
  }
}
