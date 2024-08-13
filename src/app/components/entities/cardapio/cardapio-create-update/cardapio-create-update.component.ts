import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardapioModel } from '../cardapio.model';
import { TipoCardapio } from '../../enums/tipo-cardapio.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardapioService } from '../cardapio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio-create-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cardapio-create-update.component.html',
  styleUrl: './cardapio-create-update.component.css'
})
export class CardapioCreateUpdateComponent {


  cardapioForm!: FormGroup;
  cardapio: CardapioModel | null = null;
  tiposCardapio = Object.keys(TipoCardapio);

  activeModal = inject(NgbModal);
  cardapioService = inject(CardapioService);
  router = inject(Router);

  ngOnInit(): void {

    this.criaFormulario();

    if (this.cardapio != null) {
      this.preencheFormularioActualizacao(this.cardapio);
    }
  }

  criaFormulario() {
    this.cardapioForm = new FormGroup({
      id: new FormControl(),
      descricao: new FormControl('', [Validators.required]),
      tipoCardapio: new FormControl([Validators.required])
    });
  }

  preencheFormularioActualizacao(cardapio: CardapioModel) {
    this.cardapioForm.patchValue({
      id: cardapio.id,
      descricao: cardapio.descricao,
      tipoCardapio: cardapio.tipoCardapio
    })
  }

  onSave() {
    this.cardapio = this.cardapioForm.value;
    if (this.cardapio?.id != null) {
      this.cardapioService.updateCardapio(this.cardapio).subscribe(() => {
        this.cardapioService.getCardapios();
      });

    } else {
      this.cardapioService.saveCardapio(this.cardapio!).subscribe(() => {
        this.cardapioService.getCardapios();

      });
    }

    this.cancel();

  }

  cancel() {
    this.activeModal.dismissAll();
  }

}
