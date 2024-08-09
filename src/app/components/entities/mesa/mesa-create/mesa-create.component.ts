import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estado } from '../../enums/estado/estado.enum';
import { MesaModel } from '../mesa.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mesa-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mesa-create.component.html',
  styleUrl: './mesa-create.component.css'
})
export class MesaCreateComponent implements OnInit {

  mesaForm!: FormGroup;
  mesa: MesaModel | null = null;
  estados = Object.keys(Estado);

  activeModal = inject(NgbModal);

  ngOnInit(): void {
    this.criaFormulario();
    this.mesaForm.patchValue({
      estadoMesa: Estado.DISPONIVEL
    })
  }

  criaFormulario() {
    this.mesaForm = new FormGroup({
      numero: new FormControl('', [Validators.required]),
      quantidadeLugares: new FormControl('', [Validators.required, Validators.min(1)]),
      estadoMesa: new FormControl(),
      descricao: new FormControl('')
    });
  }

  onSave() {
    this.mesa = this.mesaForm.value;

    console.log(JSON.stringify(this.mesa));
    this.cancel();
  }

  cancel(){
    this.activeModal.dismissAll();
  }

}
