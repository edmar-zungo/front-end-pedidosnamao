import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estado } from '../../enums/estado/estado.enum';
import { MesaModel } from '../mesa.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MesaService } from '../mesa.service';
import { Router } from '@angular/router';

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
  mesaService = inject(MesaService);
  router = inject(Router);

  ngOnInit(): void {
    this.criaFormulario();
    this.mesaForm.patchValue({
      estadoMesa: Estado.DISPONIVEL
    })
  }

  criaFormulario() {
    this.mesaForm = new FormGroup({
      id: new FormControl(),
      numero: new FormControl('', [Validators.required]),
      sequencia: new FormControl(),
      quantidadeLugares: new FormControl('', [Validators.required, Validators.min(1)]),
      estadoMesa: new FormControl(),
      descricao: new FormControl('')
    });
  }

  onSave() {
    this.mesa = this.mesaForm.value;
    this.mesaService.saveMesa(this.mesa!).subscribe(() => {
      this.mesaService.getMesas();
      this.router.navigate(['/mesas']);
      this.cancel();
    });
 
  }

  cancel(){
    this.activeModal.dismissAll();
  }

}
