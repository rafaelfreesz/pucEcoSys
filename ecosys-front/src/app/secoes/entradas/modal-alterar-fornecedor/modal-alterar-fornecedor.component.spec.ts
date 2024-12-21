import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterarFornecedorComponent } from './modal-alterar-fornecedor.component';

describe('ModalAlterarFornecedorComponent', () => {
  let component: ModalAlterarFornecedorComponent;
  let fixture: ComponentFixture<ModalAlterarFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAlterarFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlterarFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
