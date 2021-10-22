import { Vehiculo } from './../../../clases/vehiculo';
import { Asegurado } from './../../../clases/asegurado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-resumen',
  templateUrl: './form-resumen.component.html',
  styleUrls: ['./form-resumen.component.scss']
})
export class FormResumenComponent implements OnInit {

  @Input() datosPersonalesAsegurado: Asegurado;

  @Input() datosVehiculoAsegurado: Vehiculo;

  @Input() datosCoberturaAsegurado: any;

  @Output() editVehiculo: EventEmitter<number> = new EventEmitter<number>();


  public marcas: any[] = [];

  constructor() {}

  ngOnInit() {

  }

  editarDatosPersonales() {
    this.editVehiculo.emit(1);
  }

  editarVehiculo() {
    this.editVehiculo.emit(2);
  }

  
  editarCobertura() {
    this.editVehiculo.emit(1);
  }
}
