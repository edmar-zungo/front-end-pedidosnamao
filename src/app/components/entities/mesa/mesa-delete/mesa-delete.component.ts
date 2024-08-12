import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MesaModel } from '../mesa.model';
import { MesaService } from '../mesa.service';

@Component({
  selector: 'app-mesa-delete',
  standalone: true,
  imports: [],
  templateUrl: './mesa-delete.component.html',
  styleUrl: './mesa-delete.component.css'
})
export class MesaDeleteComponent implements OnInit {


  activeModal = inject(NgbModal);
  mesaService = inject(MesaService);

  mesa: MesaModel | null = null;


  ngOnInit(): void {

  }

  cancel() {
    this.activeModal.dismissAll();
  }

  eliminar(mesaId: string) {
    this.mesaService.deleteMesa(mesaId).subscribe(() => {
      this.mesaService.getMesas();
    });

    this.cancel();
  }
}
