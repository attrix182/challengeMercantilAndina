import { BaseFormAbstract } from '../base-form-abstract/base-form-abstract';
import { AlertService } from './../../../services/alert.service';
import { ApisService } from './../../../services/apis.service';
import { Asegurado } from './../../../clases/asegurado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-datos-personales',
  templateUrl: './form-datos-personales.component.html',
  styleUrls: ['./form-datos-personales.component.scss'],
})
export class FormDatosPersonalesComponent
  extends BaseFormAbstract
  implements OnInit
{
  public asegurado: Asegurado;
  public provincias: any;
  public ciudades: any;
  public proviniciaCompleta: any;
  public ciudadCompleta: any;
  private editando: boolean;

  @Output() sendAsegurado: EventEmitter<{
    asegurado: Asegurado;
    editando: boolean;
  }> = new EventEmitter<{ asegurado: Asegurado; editando: boolean }>();

  @Input() datosPersonalesEditar: Asegurado;

  constructor(
    private FB: FormBuilder,
    private apisSVC: ApisService,
    private alertSV: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProvincias();
    this.inicializarForm();

    this.editando = this.datosPersonalesEditar !== undefined;

    if (this.editando) {
      this.restoreForm();
    }
  }

  getProvincias() {
    this.apisSVC.getProvincias().subscribe((result) => {
      this.provincias = result.provincias.map((prov) => ({
        nombre: prov.nombre,
        id: prov.id,
      }));
    });
  }

  getCiudadesByProvincia(provincia: any) {
    this.apisSVC.getCiudades(provincia).subscribe((result) => {
      this.ciudades = result.municipios.map((munic) => ({
        nombre: munic.nombre,
        id: munic.id,
      }));
    });
  }

  onProvinciaChange() {
    this.getCiudadesByProvincia(this.formGroup.value.provincia);
  }

  verifyExistingUser() {
    this.apisSVC.verifyUser(this.formGroup.value.usuario).subscribe(
      (result) => {
        if (result) {
          this.alertSV.alert('warning', 'Ese nombre ya esta ocupado', 1000);
          this.formGroup.controls['usuario'].setErrors({
            userExists: true,
          });
        }
        return result;
      },
      (error) => {}
    );
  }

  validarEdad() {
    var hoy = new Date();
    var cumpleanos = new Date(this.formGroup.value.fechaNacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    if (edad < 18 || edad > 99) {
      this.alertSV.alert('warning', 'No cumples con la edad requerida', 1000);
      this.formGroup.controls['fechaNacimiento'].setErrors({
        invalid: true,
      });
    }
  }

  definirMensajesError(): void {
    this.mensajesError = {
      dni: {
        required: 'El DNI es obligatorio',
        minlength: 'El DNI debe tener al menos 7 digitos',
        maxlength: 'El DNI debe tener maximo 8 digitos',
        pattern: 'El DNI debe contener solo numeros',
      },
      apellido: {
        required: 'El apellido es obligatorio',
        minlength: 'El apellido debe tener al menos 2 caracteres',
        maxlength: 'El apellido debe tener maximo 15 caracteres',
        pattern: 'El apellido debe contener solo letras',
      },
      nombre: {
        required: 'El nombre es obligatorio',
        minlength: 'El nombre debe tener al menos 2 caracteres',
        maxlength: 'El nombre debe tener maximo 15 caracteres',
        pattern: 'El nombre debe contener solo letras',
      },
      email: {
        pattern: 'El email debe tener un formato valido',
      },
      celular: {
        pattern: 'Ingrese el numero sin 0 ni 15, por ejemplo: 1145671234',
      },
      telefono: {
        pattern: 'Ingrese el numero sin 0 ni 15, por ejemplo: 1145671234',
      },
      usuario: {
        required: 'El usuario es obligatorio',
        minlength: 'El usuario debe tener al menos 3 caracteres',
        maxlength: 'El usuario debe tener maximo 30 aracteres',
      },
      fechaNacimiento: {
        invalid: 'La fecha de nacimiento no es valida',
      },
      provincia: {
        required: 'La provincia es obligatoria',
      },
      ciudad: {
        required: 'La ciudad es obligatoria',
      },
      contrasena: {
        required: 'La contraseña es obligatoria',
        pattern:
          'La contraseña debe tener entre 8 y 30 caracteres, mayusculas, minusculas y numeros',
      },
    };
  }

  inicializarForm() {
    this.formGroup = this.FB.group({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(7),
        Validators.maxLength(8),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z]*'),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      celular: new FormControl('', [Validators.pattern('^[0-9]{10}$')]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{10}$')]),
      provincia: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      fechaNacimiento: new FormControl('', [Validators.required]),

      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
        ),
      ]),
    });
  }

  restoreForm() {
    this.getCiudadesByProvincia(this.datosPersonalesEditar.provincia);
    this.formGroup.patchValue({
      apellido: this.datosPersonalesEditar.apellido,
      nombre: this.datosPersonalesEditar.nombre,
      dni: this.datosPersonalesEditar.dni,
      email: this.datosPersonalesEditar.email,
      celular: this.datosPersonalesEditar.celular,
      telefono: this.datosPersonalesEditar.telefono,

      provincia: this.datosPersonalesEditar.provincia,
      ciudad: this.datosPersonalesEditar.ciudad,

      domicilio: this.datosPersonalesEditar.domicilio,
      fechaNacimiento: this.datosPersonalesEditar.fechaNacimiento,
      usuario: this.datosPersonalesEditar.usuario,
      contrasena: this.datosPersonalesEditar.contrasena,
    });
  }

  nextStep() {
    const editando: boolean = this.editando;

    const asegurado: Asegurado = this.formGroup.value;
    asegurado.provinciaCompleta = this.provincias.find(
      (prov) => prov.id == this.formGroup.value.provincia
    );
    asegurado.ciudadCompleta = this.ciudades.find(
      (ciudad) => ciudad.id == this.formGroup.value.ciudad
    );

    this.sendAsegurado.emit({ asegurado, editando });
  }
}
