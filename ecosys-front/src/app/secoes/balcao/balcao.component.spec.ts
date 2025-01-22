import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalcaoComponent } from './balcao.component';

describe('BalcaoComponent', () => {
  let component: BalcaoComponent;
  let fixture: ComponentFixture<BalcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalcaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
