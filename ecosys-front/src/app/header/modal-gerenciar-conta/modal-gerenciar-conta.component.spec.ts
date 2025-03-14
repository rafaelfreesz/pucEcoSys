import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGerenciarContaComponent } from './modal-gerenciar-conta.component';

describe('ModalGerenciarContaComponent', () => {
  let component: ModalGerenciarContaComponent;
  let fixture: ComponentFixture<ModalGerenciarContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGerenciarContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGerenciarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
