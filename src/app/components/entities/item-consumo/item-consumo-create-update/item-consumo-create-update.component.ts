import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemConsumoModel } from '../item-consumo.model';
import { Estado } from '../../enums/estado.enum';
import { TipoBebida } from '../../enums/tipo-bebida.enum';
import { TipoPrato } from '../../enums/tipo-prato.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoService } from '../item-consumo.service';
import { Router } from '@angular/router';
import { TipoItemConsumo } from '../../enums/tipo-item-consumo.enum';

@Component({
  selector: 'app-item-consumo-create-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-consumo-create-update.component.html',
  styleUrl: './item-consumo-create-update.component.css'
})
export class ItemConsumoCreateUpdateComponent {

  itemConsumoForm!: FormGroup;
  itemConsumo: ItemConsumoModel | null = null;
  estados = Object.keys(Estado);
  tipoBebida = Object.keys(TipoBebida);
  tipoPrato = Object.keys(TipoPrato);

  activeModal = inject(NgbModal);
  itemConsumoService = inject(ItemConsumoService);
  router = inject(Router);

  ngOnInit(): void {

    this.criaFormulario();

    if (this.itemConsumo != null) {
      this.preencheFormularioActualizacao(this.itemConsumo);
    }
  }

  criaFormulario() {
    this.itemConsumoForm = new FormGroup({
      id: new FormControl(),
      imagem: new FormControl(null),
      descricao: new FormControl(''),
      preco: new FormControl(Validators.required),
      estadoItem: new FormControl(Estado.DISPONIVEL),
      dataCriacao: new FormControl(),
      cozinha: new FormControl(''),
      origem: new FormControl(''),
      dataActualizacao: new FormControl(),
      tipoItemConsumo: new FormControl(TipoItemConsumo),
      tipoPrato: new FormControl(),
      tipoBebida: new FormControl(),
      cardapio: new FormControl(),
    });
  }

  preencheFormularioActualizacao(itemConsumo: ItemConsumoModel) {
    this.itemConsumoForm.patchValue({
      id: itemConsumo.id,
      imagem: itemConsumo.imagem,
      descricao: itemConsumo.descricao,
      preco: itemConsumo.preco,
      estadoItem: itemConsumo.estadoItem,
      dataCriacao: itemConsumo.dataCriacao,
      cozinha: itemConsumo.cozinha,
      origem: itemConsumo.origem,
      dataActualizacao: itemConsumo.dataActualizacao,
      tipoItemConsumo: itemConsumo.tipoItemConsumo,
      tipoPrato: itemConsumo.tipoPrato,
      tipoBebida: itemConsumo.tipoBebida,
      cardapio: itemConsumo.cardapio,
    })
  }

  onSave() {
    this.itemConsumo = this.itemConsumoForm.value;
    if (this.itemConsumo?.id != null) {
      this.itemConsumoService.updateItemConsumo(this.itemConsumo).subscribe(() => {
        this.itemConsumoService.getItensConsumo();
      });

    } else {
      this.itemConsumoService.saveItenConsumo(this.itemConsumo!).subscribe(() => {
        this.itemConsumoService.getItensConsumo();

      });
    }

    this.cancel();

  }

  cancel() {
    this.activeModal.dismissAll();
  }

}
