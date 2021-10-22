
import { Vehiculo } from './../../clases/vehiculo';
import { Asegurado } from './../../clases/asegurado';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public paso: number = 1;
  public asegurado: Asegurado;
  public vehiculo: Vehiculo;
  public cobertura: any;

  constructor() {}

  ngOnInit(): void {}

  recibirDatosPersonales(asegurado: Asegurado) {
    this.paso = 2;
    this.asegurado = asegurado;
    console.log(this.asegurado)
  }

  recibirDatosVehiculo(vehiculo: Vehiculo) {
    this.paso = 3;
    this.vehiculo = vehiculo;
    console.log(this.vehiculo)
  }

  recibirDatosCobertura(cobertura: any) {
    this.paso = 4;
    this.cobertura = cobertura;
    console.log(this.cobertura)
  }

}
