import { Vehiculo } from './../../clases/vehiculo';
import { Asegurado } from './../../clases/asegurado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  public paso: number = 1;
  public asegurado: Asegurado;
  public vehiculo: Vehiculo;
  public cobertura: any;

  constructor() {}

  ngOnInit(): void {}

  recibirDatosPersonales(asegurado: Asegurado, editando: boolean) {
    this.paso = editando ? 4 : 2;
    this.asegurado = asegurado;
  }

  recibirDatosVehiculo(vehiculo: Vehiculo, editando: boolean) {
    this.paso = editando ? 4 : 3;
    this.vehiculo = vehiculo;
  }

  recibirDatosCobertura(cobertura: any) {
    this.paso = 4;
    this.cobertura = cobertura;
  }

  finalizar(registrado: boolean) {
    if (registrado) {
      this.paso = 5;
      this.asegurado = null;
      this.vehiculo = null;
      this.cobertura = null;
    }
  }

  goToEdit(paso: any) {
    this.paso = paso;
  }
}
