import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinalComponent } from './form-final.component';

describe('FormFinalComponent', () => {
  let component: FormFinalComponent;
  let fixture: ComponentFixture<FormFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
