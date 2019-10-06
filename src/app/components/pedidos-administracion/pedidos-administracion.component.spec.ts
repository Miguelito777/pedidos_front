import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdministracionComponent } from './pedidos-administracion.component';

describe('PedidosAdministracionComponent', () => {
  let component: PedidosAdministracionComponent;
  let fixture: ComponentFixture<PedidosAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
