import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGerenciarUsuariosComponent } from './modal-gerenciar-usuarios.component';

describe('ModalGerenciarUsuariosComponent', () => {
  let component: ModalGerenciarUsuariosComponent;
  let fixture: ComponentFixture<ModalGerenciarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGerenciarUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGerenciarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
