import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemConsumoService } from '../item-consumo.service';
import { ItemConsumoModel } from '../item-consumo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemConsumoCreateUpdateComponent } from '../item-consumo-create-update/item-consumo-create-update.component';

@Component({
  selector: 'app-item-consumo-details',
  standalone: true,
  imports: [],
  templateUrl: './item-consumo-details.component.html',
  styleUrl: './item-consumo-details.component.css'
})
export class ItemConsumoDetailsComponent implements OnInit{
 
  itemConsumo: ItemConsumoModel | null = null;
  urlImagem: string | null = null;

  activatedRoute = inject(ActivatedRoute);
  itemConsumoService = inject(ItemConsumoService);
  activeModal = inject(NgbModal);
  modalService = inject(NgbModal)
  cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.carregarImagem(this.itemConsumo?.imagem!);
  }

  openCreateItemConsumoModel() {
    this.cancel();
		const modalRef = this.modalService.open(ItemConsumoCreateUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.itemConsumo = this.itemConsumo;
	} 

  cancel() {
    this.activeModal.dismissAll();
  }

  carregarImagem(imagemBase64: string | null){
    if (imagemBase64) {
       this.urlImagem = `data:'';base64,${imagemBase64}`;
    }
  }
  

}
