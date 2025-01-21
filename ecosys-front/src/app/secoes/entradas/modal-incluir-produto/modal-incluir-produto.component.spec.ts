import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIncluirProdutoComponent } from './modal-incluir-produto.component';

describe('ModalIncluirProdutoComponent', () => {
  let component: ModalIncluirProdutoComponent;
  let fixture: ComponentFixture<ModalIncluirProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIncluirProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIncluirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
