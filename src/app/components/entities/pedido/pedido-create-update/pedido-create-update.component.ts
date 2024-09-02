import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoModel } from '../pedido.model';
import { Estado } from '../../enums/estado.enum';
import { EstadoPedido } from '../../enums/estado-pedido.enum';
import { MesaModel } from '../../mesa/mesa.model';
import { MesaService } from '../../mesa/mesa.service';
import { Router } from '@angular/router';
import { PedidoService } from '../../pedido.service';

@Component({
  selector: 'app-pedido-create-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pedido-create-update.component.html',
  styleUrl: './pedido-create-update.component.css'
})
export class PedidoCreateUpdateComponent implements OnInit{
 
  pedidoForm!: FormGroup;
  pedido: PedidoModel | null = null;
  estadoPedido = Object.keys(EstadoPedido);
  mesas: MesaModel[] = [];

  router = inject(Router);
  pedidoService = inject(PedidoService);

  constructor(public mesaService: MesaService){}

  ngOnInit(): void {
    this.carregaMesas();
    this.criaFormulario();
  }

  criaFormulario() {
    const dataActual = new Date(Date.now());
    this.pedidoForm = new FormGroup({
      id: new FormControl(),
      dataCriacao: new FormControl(dataActual.toISOString().slice(0, 16)),
      sequencia: new FormControl(null),
      numero: new FormControl(null),
      dataActualizacao: new FormControl(dataActual.toISOString().slice(0, 16)),
      mesa: new FormControl(null),
      estadoPedido: new FormControl(EstadoPedido.PENDENTE),
      descricao: new FormControl(),
      isDeliver: new FormControl(false),
      enderecoEntregaDetalhado: new FormControl(''),
      tempoEntrega: new FormControl(null),
      descricaoEntrega: new FormControl(''),
      valorEntrega: new FormControl(0, [Validators.required]),
      totalPagar: new FormControl(0,  [Validators.required]),
      totalPago: new FormControl(0, [Validators.required]),
      totalTroco: new FormControl(0, [Validators.required])
    });
  }

  carregaMesas(){
    this.mesaService.getMesas();
  }

  cancel(){
    this.router.navigate(['/pedidos']);
  }

  onSave() {
    this.pedido = this.pedidoForm.value;
    if (this.pedido?.id != null) {
      this.pedidoService.updatePedido(this.pedido).subscribe(() => {
        this.pedidoService.getPedidos();
      });

    } else {
      this.pedidoService.savePedido(this.pedido!).subscribe(() => {
        this.pedidoService.getPedidos();

      });
    }

    this.cancel();

  }

}
