import { Component, OnInit, inject, signal } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { MesaCreateComponent } from '../mesa-create/mesa-create.component';
import { MesaModel } from '../mesa.model';
import { MesaService } from '../mesa.service';

@Component({
  selector: 'app-mesa-list',
  standalone: true,
  imports: [],
  templateUrl: './mesa-list.component.html',
  styleUrl: './mesa-list.component.css'
})
export class MesaListComponent implements OnInit{

	protected modalService = inject(NgbModal);
	constructor(public mesaService: MesaService){}

  ngOnInit(): void {
    this.mesaService.getMesas();
  }

  openCresteMesaModal() {
		const modalRef = this.modalService.open(MesaCreateComponent, { size: 'lg' });
	}
  openUpdateMesaModal(mesa: MesaModel) {
		const modalRef = this.modalService.open(MesaCreateComponent, { size: 'lg' });
    modalRef.componentInstance.mesa = mesa;
	}

  updateMesa(mesaId: string){
    this.mesaService.getOneMesa(mesaId).subscribe(mesaResult => {
      let mesaToUpdate = mesaResult;

      this.openUpdateMesaModal(mesaToUpdate);
    });
  }
}
