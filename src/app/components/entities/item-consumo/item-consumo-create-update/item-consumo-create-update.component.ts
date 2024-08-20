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
import { CardapioModel } from '../../cardapio/cardapio.model';

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
  tiposBebida = Object.keys(TipoBebida);
  tiposPrato = Object.keys(TipoPrato);
  tiposItemConsumo = Object.keys(TipoItemConsumo);
  dataActual = new Date(Date.now());

  cardapio: CardapioModel | null = null;

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
      imagem: new FormControl(),
      descricao: new FormControl(''),
      preco: new FormControl(Validators.required),
      tipoItemConsumo: new FormControl(''),
      dataCriacao: new FormControl(this.dataActual),
      cozinha: new FormControl(''),
      origem: new FormControl(''),
      dataActualizacao: new FormControl(this.dataActual),
      estadoItem: new FormControl(Estado.DISPONIVEL),
      tipoPrato: new FormControl(null),
      tipoBebida: new FormControl(null),
      cardapio: new FormControl(this.cardapio),
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

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.itemConsumoForm.patchValue({
        imagem: base64Image
      });
      this.itemConsumoForm.get('imagem')?.updateValueAndValidity();
    }

  }

}
