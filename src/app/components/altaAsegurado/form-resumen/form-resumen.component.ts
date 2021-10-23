import { AlertService } from './../../../services/alert.service';
import { Vehiculo } from './../../../clases/vehiculo';
import { Asegurado } from './../../../clases/asegurado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-resumen',
  templateUrl: './form-resumen.component.html',
  styleUrls: ['./form-resumen.component.scss'],
})
export class FormResumenComponent implements OnInit {
  @Input() datosPersonalesAsegurado: Asegurado;

  @Input() datosVehiculoAsegurado: Vehiculo;

  @Input() datosCoberturaAsegurado: any;

  @Output() editVehiculo: EventEmitter<number> = new EventEmitter<number>();

  @Output() registrado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public marcas: any[] = [];

  public enviando: boolean = false;

  constructor(private alertSV: AlertService) {}

  ngOnInit() {}

  editarDatosPersonales() {
    this.editVehiculo.emit(1);
  }

  editarVehiculo() {
    this.editVehiculo.emit(2);
  }

  editarCobertura() {
    this.editVehiculo.emit(3);
  }

  enviarDatos() {
    console.log('Enviar datos');
    this.enviando = true;
    setTimeout(() => {
      this.enviando = false;
      this.alertSV.alert('success', 'Alta enviada con exito!', 1500);
      setTimeout(() => {
       this.registrado.emit(true);
      }, 1500);
    }, 2000);
  }
}
