import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaEntradaComponent } from './modal-entrada.component';

describe('ModaEntradaComponent', () => {
  let component: ModaEntradaComponent;
  let fixture: ComponentFixture<ModaEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
