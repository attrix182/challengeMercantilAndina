import { Vehiculo } from './../../../clases/vehiculo';
import { ApisService } from './../../../services/apis.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-datos-vehiculo',
  templateUrl: './form-datos-vehiculo.component.html',
  styleUrls: ['./form-datos-vehiculo.component.scss']
})
export class FormDatosVehiculoComponent implements OnInit {

  public vehiculo: Vehiculo;
  public formDatosVehiculo: FormGroup;
  public modelos: any;
  public marcas: any;
  public versiones: any;

  @Output() sendVehiculo: EventEmitter<Vehiculo> = new EventEmitter<Vehiculo>();

  constructor(private FB: FormBuilder, private apisSVC: ApisService) { }

  ngOnInit(): void {

    this.getMarcas();
    this.formDatosVehiculo = this.FB.group({

      marca: new FormControl('', [Validators.required]),
      anio: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      modelo: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
    });
  }


  validateYear() {
    let anio = this.formDatosVehiculo.value.anio;
    let anioActual = new Date().getFullYear();

    if (anio > anioActual || anio < anioActual - 20) {
      this.formDatosVehiculo.get('anio').setErrors({ 'invalidYear': true });
    }
    return false;
  }

  getMarcas() {
    this.apisSVC.getMarcas().subscribe(
      result => {
        this.marcas = result.map(marca => ({ nombre: marca.desc, id: marca.codigo }));
      },
    );
  }

  getModelosByMarcaAnio(event: Event) {

    let marca = this.formDatosVehiculo.value.marca.id;
    let anio = this.formDatosVehiculo.value.anio;

    if (!marca || !anio) {
      return;
    }

    this.apisSVC.getModelos(marca, anio).subscribe(
      result => {
        this.modelos = result;
      },
    );
  }

  getVersiones(event: Event) {
    let anio = this.formDatosVehiculo.value.anio;
    let marca = this.formDatosVehiculo.value.marca.id;
    let modelo = this.formDatosVehiculo.value.modelo;

    this.apisSVC.getVersiones(marca, anio, modelo).subscribe(
      result => {
        this.versiones = result.map(version => ({ nombre: version.desc, id: version.codigo }));
      },
      error => {
        console.log(error);
      }
    );
  }


  isValidField(field: string): string {
    const validateField = this.formDatosVehiculo.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  nextStep() {

    this.vehiculo = this.formDatosVehiculo.value;
    this.sendVehiculo.emit(this.vehiculo);
  }

}
