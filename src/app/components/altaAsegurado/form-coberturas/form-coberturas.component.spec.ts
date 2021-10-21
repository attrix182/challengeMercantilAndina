import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoberturasComponent } from './form-coberturas.component';

describe('FormCoberturasComponent', () => {
  let component: FormCoberturasComponent;
  let fixture: ComponentFixture<FormCoberturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoberturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoberturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
