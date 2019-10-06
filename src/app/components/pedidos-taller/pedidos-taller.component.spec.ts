import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosTallerComponent } from './pedidos-taller.component';

describe('PedidosTallerComponent', () => {
  let component: PedidosTallerComponent;
  let fixture: ComponentFixture<PedidosTallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosTallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
