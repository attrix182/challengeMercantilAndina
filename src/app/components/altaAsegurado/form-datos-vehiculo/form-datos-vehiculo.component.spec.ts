import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatosVehiculoComponent } from './form-datos-vehiculo.component';

describe('FormDatosVehiculoComponent', () => {
  let component: FormDatosVehiculoComponent;
  let fixture: ComponentFixture<FormDatosVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDatosVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatosVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
