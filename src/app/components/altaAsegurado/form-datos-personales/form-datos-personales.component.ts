import { ApisService } from './../../../services/apis.service';
import { Asegurado } from './../../../clases/asegurado';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-form-datos-personales',
  templateUrl: './form-datos-personales.component.html',
  styleUrls: ['./form-datos-personales.component.scss']
})
export class FormDatosPersonalesComponent implements OnInit {
  public asegurado: Asegurado;
  public formDatosPersonales: FormGroup;
  public provincias: any;
  public ciudades: any;

  public proviniciaCompleta: any;
  public ciudadCompleta: any


  @Output() sendAsegurado: EventEmitter<Asegurado> = new EventEmitter<Asegurado>();

  @Output() sendAseguradoEdited: EventEmitter<Asegurado> = new EventEmitter<Asegurado>();

  @Input() datosPersonalesEditar: Asegurado;

  constructor(private FB: FormBuilder, private apisSVC: ApisService) { }

  ngOnInit(): void {

    this.getProvincias();

    this.formDatosPersonales = this.FB.group({

      dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern('[0-9]*')]),
      telefono: new FormControl('', [Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[0-9]*')]),
      provincia: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      fechaNacimiento: new FormControl('', [Validators.required]),

      usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'), ]),

    });


    this.restoreForm();

  }


  getProvincias() {
    this.apisSVC.getProvincias().subscribe(
      result => {

        this.provincias = result.provincias.map(prov => ({ nombre: prov.nombre, id: prov.id }));

      },
    );
  }

  getCiudadesByProvincia(provincia: any) {
    console.log(provincia)
    this.apisSVC.getCiudades(provincia).subscribe(
      result => {
        this.ciudades = result.municipios.map(munic => ({ nombre: munic.nombre, id: munic.id }));
      },
    );
  }

  verifyExistingUser() {
    this.apisSVC.verifyUser(this.formDatosPersonales.value.usuario).subscribe(
      result => {
        if (result) {
          this.alert('warning','Ese nombre ya esta ocupado')
          this.formDatosPersonales.controls['usuario'].setErrors({
            'userExists': true
          });
        }
        return result
      },
      error => {
        console.log(error);
      }
    );
  }

  validarEdad() {
    var hoy = new Date();
    var cumpleanos = new Date(this.formDatosPersonales.value.fechaNacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    if (edad < 18 || edad > 99) {
      this.alert('warning','No cumples con la edad requerida')
      this.formDatosPersonales.controls['fechaNacimiento'].setErrors({
        'invalid': true
      });
    }

  }

  onProvinciaChange() {
    this.getCiudadesByProvincia(this.formDatosPersonales.value.provincia);
  }


  restoreForm() {
    if (!this.datosPersonalesEditar) {
      return;
    }

    this.getCiudadesByProvincia(this.datosPersonalesEditar.provincia);
    this.formDatosPersonales.patchValue({
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

  isValidField(field: string): string {
    const validateField = this.formDatosPersonales.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  nextStep() {
    this.asegurado = this.formDatosPersonales.value;
    this.asegurado.provinciaCompleta = this.provincias.find(prov => prov.id == this.formDatosPersonales.value.provincia);
    this.asegurado.ciudadCompleta = this.ciudades.find(ciudad => ciudad.id == this.formDatosPersonales.value.ciudad);
    this.sendAsegurado.emit(this.asegurado)
  }

  finishModify() {
    this.asegurado = this.formDatosPersonales.value;
    this.asegurado.provinciaCompleta = this.provincias.find(prov => prov.id == this.formDatosPersonales.value.provincia);
    this.asegurado.ciudadCompleta = this.ciudades.find(ciudad => ciudad.id == this.formDatosPersonales.value.ciudad);
    this.sendAseguradoEdited.emit(this.asegurado)
  }


  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: text,
    });
  }
}
