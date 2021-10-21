import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResumenComponent } from './form-resumen.component';

describe('FormResumenComponent', () => {
  let component: FormResumenComponent;
  let fixture: ComponentFixture<FormResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
