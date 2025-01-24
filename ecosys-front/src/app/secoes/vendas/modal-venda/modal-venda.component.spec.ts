import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVendaComponent } from './modal-venda.component';

describe('ModalVendaComponent', () => {
  let component: ModalVendaComponent;
  let fixture: ComponentFixture<ModalVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
