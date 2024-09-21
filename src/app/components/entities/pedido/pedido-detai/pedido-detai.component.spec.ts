import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetaiComponent } from './pedido-detai.component';

describe('PedidoDetaiComponent', () => {
  let component: PedidoDetaiComponent;
  let fixture: ComponentFixture<PedidoDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDetaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
