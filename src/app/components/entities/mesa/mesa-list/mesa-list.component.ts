import { Component, inject } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { MesaCreateComponent } from '../mesa-create/mesa-create.component';

@Component({
  selector: 'app-mesa-list',
  standalone: true,
  imports: [],
  templateUrl: './mesa-list.component.html',
  styleUrl: './mesa-list.component.css'
})
export class MesaListComponent {
	private modalService = inject(NgbModal);

  openCresteMesaModal() {
		const modalRef = this.modalService.open(MesaCreateComponent, { size: 'lg' });
	}
}
