import { Asegurado } from './../../clases/asegurado';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public asegurado: Asegurado;
  public formDatosPersonales: FormGroup;


  constructor(private FB: FormBuilder) { }

  ngOnInit(): void {



    this.formDatosPersonales = this.FB.group({
 
      dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]),
      apellido: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      celular: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),

      usuario: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]),

      contrasena: new FormControl('', [Validators.required]),

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


test(){

  console.log(this.formDatosPersonales.value);
}

}
