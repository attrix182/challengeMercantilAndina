import { Vehiculo } from './../../../clases/vehiculo';
import { ApisService } from './../../../services/apis.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-datos-vehiculo',
  templateUrl: './form-datos-vehiculo.component.html',
  styleUrls: ['./form-datos-vehiculo.component.scss'],
})
export class FormDatosVehiculoComponent implements OnInit {
  public vehiculo: Vehiculo;
  public formDatosVehiculo: FormGroup;
  public modelos: any;
  public marcas: any;
  public versiones: any;
  public marcaCompleta: any;
  public versionCompleta: any;
  private editando: boolean;

  @Output() sendVehiculo: EventEmitter<{
    vehiculo: Vehiculo;
    editando: boolean;
  }> = new EventEmitter<{ vehiculo: Vehiculo; editando: boolean }>();
  @Input() datosVehiculoEditar: Vehiculo;

  constructor(private FB: FormBuilder, private apisSVC: ApisService) {}

  ngOnInit(): void {
    this.getMarcas();
    this.inicializarForm();

    this.editando = this.datosVehiculoEditar !== undefined;

    if (this.editando) {
      this.restoreForm();
    }
  }

  inicializarForm() {
    this.formDatosVehiculo = this.FB.group({
      marca: new FormControl('', [Validators.required]),
      anio: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      modelo: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
    });
  }

  isValidField(field: string): string {
    const validateField = this.formDatosVehiculo.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
      ? 'is-valid'
      : '';
  }

  validateYear() {
    let anio = this.formDatosVehiculo.value.anio;
    let anioActual = new Date().getFullYear();

    if (anio > anioActual || anio < anioActual - 20) {
      this.formDatosVehiculo.get('anio').setErrors({ invalidYear: true });
    }
    return false;
  }

  getMarcas() {
    this.apisSVC.getMarcas().subscribe((result) => {
      this.marcas = result.map((marca) => ({
        nombre: marca.desc,
        id: marca.codigo,
      }));
    });
  }

  getModelosByMarcaAnio(marca: string, anio: string | number) {
    if (!marca || !anio) {
      return;
    }

    this.apisSVC.getModelos(marca, anio).subscribe((result) => {
      this.modelos = result;
    });
  }

  getVersiones(marca: string, modelo: string, anio: number | string) {
    this.apisSVC.getVersiones(marca, anio, modelo).subscribe(
      (result) => {
        this.versiones = result.map((version) => ({
          nombre: version.desc,
          id: version.codigo,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onMarcaAnioChange() {
    this.formDatosVehiculo.get('version').setValue('');
    if (this.vehiculo) {
      this.vehiculo.version = null;
      this.vehiculo.versionCompleta = null;
    }
    this.getModelosByMarcaAnio(
      this.formDatosVehiculo.value.marca,
      this.formDatosVehiculo.value.anio
    );
  }

  onVersionChange() {
    this.getVersiones(
      this.formDatosVehiculo.value.marca,
      this.formDatosVehiculo.value.modelo,
      this.formDatosVehiculo.value.anio
    );
  }

  nextStep() {
    const vehiculo = this.formDatosVehiculo.value;
    vehiculo.marcaCompleta = this.marcas.find(
      (marca) => marca.id === this.formDatosVehiculo.value.marca
    );
    vehiculo.versionCompleta = this.versiones.find(
      (version) => version.id === this.formDatosVehiculo.value.version
    );

    const editando = this.editando;
    this.sendVehiculo.emit({ vehiculo, editando });
  }

  restoreForm() {
    if (!this.datosVehiculoEditar) {
      return;
    }

    this.getModelosByMarcaAnio(
      this.datosVehiculoEditar.marca,
      this.datosVehiculoEditar.anio
    );
    this.getVersiones(
      this.datosVehiculoEditar.marca,
      this.datosVehiculoEditar.modelo,
      this.datosVehiculoEditar.anio
    );

    this.formDatosVehiculo.patchValue({
      marca: this.datosVehiculoEditar.marca,
      anio: this.datosVehiculoEditar.anio,
      modelo: this.datosVehiculoEditar.modelo,
      version: this.datosVehiculoEditar.version,
    });
  }
}
