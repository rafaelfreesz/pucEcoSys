import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoDoDiaComponent } from './resumo-do-dia.component';

describe('ResumoDoDiaComponent', () => {
  let component: ResumoDoDiaComponent;
  let fixture: ComponentFixture<ResumoDoDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumoDoDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoDoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
