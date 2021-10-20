import { ApisService } from './../../services/apis.service';
import { Asegurado } from './../../clases/asegurado';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public asegurado: Asegurado;
  public formDatosPersonales: FormGroup;
  public provincias: any;
  public provinciasNombres: string;
  public ciudadesNombres: string;
  public paso: number = 1;

  constructor(private FB: FormBuilder, private apisSVC: ApisService) { }

  ngOnInit(): void {

    this.getProvincias();

    this.formDatosPersonales = this.FB.group({

      dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(14), Validators.pattern('[0-9]*')]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), Validators.pattern('[0-9]*')]),
      provincia: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      fechaNacimiento: new FormControl('', [Validators.required]),

      usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),

      contrasena: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),

    });
  }

  getProvincias() {
    this.provincias = this.apisSVC.getProvincias().subscribe(
      result => {
        this.provinciasNombres = result.provincias.map(provincia => provincia.nombre);
      },
    );
  }

  getCiudadesByProvincia(provincia: string) {
    console.log(provincia);
    this.apisSVC.getCiudades(provincia).subscribe(
      result => {
        this.ciudadesNombres = result.municipios.map(municipio => municipio.nombre);
      },
    );
  }



  isValidField(field: string): string {
    const validateField = this.formDatosPersonales.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }


  test() {
    console.log(this.formDatosPersonales.value);
    this.validarEdad();

  }

  verifyExistingUser() {

    this.apisSVC.verifyUser(this.formDatosPersonales.value.usuario).subscribe(
      result => {
        if (result) {
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
      this.formDatosPersonales.controls['fechaNacimiento'].setErrors({
        'invalid': true
      });
    }

  }

}
