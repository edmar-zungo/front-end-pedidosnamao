import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoModel } from '../pedido.model';
import { Estado } from '../../enums/estado.enum';
import { EstadoPedido } from '../../enums/estado-pedido.enum';

@Component({
  selector: 'app-pedido-create-update',
  standalone: true,
  imports: [],
  templateUrl: './pedido-create-update.component.html',
  styleUrl: './pedido-create-update.component.css'
})
export class PedidoCreateUpdateComponent implements OnInit{
 
  pedidoForm!: FormGroup;
  pedido: PedidoModel | null = null;
  estadoPedido = Object.keys(EstadoPedido);
  dataActual = new Date(Date.now());

  ngOnInit(): void {
    
  }

  criaFormulario() {
    this.pedidoForm = new FormGroup({
      id: new FormControl(),
      dataCriacao: new FormControl(this.dataActual),
      sequencia: new FormControl(null),
      numero: new FormControl(null),
      dataActualizacao: new FormControl(this.dataActual),
      mesa: new FormControl(null, [Validators.required]),
      estadoPedido: new FormControl(EstadoPedido.PENDENTE),
      descricao: new FormControl(),
      isDeliver: new FormControl(false),
      enderecoEntregaDetalhado: new FormControl(''),
      tempoEntrega: new FormControl(null),
      descricaoEntrega: new FormControl(''),
      valorEntrega: new FormControl(0),
      totalPagar: new FormControl(0),
      totalPago: new FormControl(0),
      totalTroco: new FormControl(0)
    });
  }

}
